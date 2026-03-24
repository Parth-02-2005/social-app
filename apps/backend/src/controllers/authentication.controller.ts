import { loginResponseSchema, loginSchemaBody, registerSchemaBody, registerResponseSchema } from "@/schema/auth.schema.js";
import { AuthenticationService } from "@/services/authentication.service.js";
import { OpenAPIHono } from "@hono/zod-openapi";
import { setCookie } from "hono/cookie";
import { generateToken } from "../utils/jwt.js";

export const authenticationRouter = new OpenAPIHono();
const authenticationService = new AuthenticationService();

authenticationRouter.openapi({
  method: "post",
  tags: ["Auth"],
  path: "/login",
  request: {
    body: {
      content: {
        "application/json": {
          schema: loginSchemaBody
        }
      }
    }
  },
  responses: {
    200: {
      description: "Successfully logged in",
      content: {
        "application/json": {
          schema: loginResponseSchema
        }
      }
    }
  }
}, async (c) => {

  const body = c.req.valid("json");

  const result = await authenticationService.login(body);

  const token = generateToken(result.id)

  setCookie(c, "token", token, {
    httpOnly: true,
    secure: false, 
    sameSite: "Lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 
  });

  return c.json(result, 200);

});

authenticationRouter.openapi({
  method: "post",
  tags: ["Auth"],
  path: "/register",
  request: {
    body: {
      content: {
        "application/json": {
          schema: registerSchemaBody
        }
      }
    }
  },
  responses: {
    201: {
      description: "User registered successfully",
      content: {
        "application/json": {
          schema: registerResponseSchema
        }
      }
    }
  }
}, async (c) => {

  const body = c.req.valid("json");

  const result = await authenticationService.register(body);

  return c.json(result, 201);

});

// authenticationRouter.openapi({
//   method: "get",
//   tags: ["Auth"],
//   path: "/me",
//   responses: {
//     200: {
//       description: "Current user"
//     }
//   }
// }, async (c) => {

//   const token = getCookie(c, "token")

//   if (!token) {
//     throw new ApiError(401, "Unauthorized")
//   }

//   const payload = verifyToken(token)

//   const user = await User.findById(payload.userId)

//   if (!user) {
//     throw new ApiError(404, "User not found")
//   }

//   return c.json({
//     id: user._id,
//     userName: user.userName,
//     email: user.email
//   })
// })