import { loginResponseSchema, loginSchemaBody, registerSchemaBody, registerResponseSchema, googleCallbackQuerySchema, googleAuthResponseSchema, errorResponseSchema } from "@/schema/auth.schema.js";
import { AuthenticationService, googleClient } from "@/services/authentication.service.js";
import { OpenAPIHono } from "@hono/zod-openapi";
import { setCookie, getCookie } from "hono/cookie";
import { generateToken } from "../utils/jwt.js";
import { generateCodeVerifier, generateState } from "arctic";
import { ApiError } from "@/utils/apiError.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";

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

authenticationRouter.openapi({
    method: "get",
    tags: ["Auth"],
    path: "/google",
    responses: {
      302: {
        description: "Redirect to Google login",
      }
    }
  },
  async (c) => {

    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const url = await googleClient.createAuthorizationURL(state, codeVerifier, ["openid", "profile", "email"])

    setCookie(c, "oauth_state", state, { httpOnly: true, path: "/", maxAge: 600 });
    setCookie(c, "code_verifier", codeVerifier, { httpOnly: true, path: "/", maxAge: 600 });

    return c.redirect(url.toString()) as any;

  });

authenticationRouter.openapi({
  method: "get",
  tags: ["Auth"],
  path: "/callback",
  request: {
    query: googleCallbackQuerySchema
  },
  responses: {
    200: {
      description: "Redirect after successfull google login",
      content: {
        "application/json": {
          schema: googleAuthResponseSchema
        }
      }
    },
    400: {
      description: "Invalid state",
      content: {
        "application/json": {
          schema: errorResponseSchema
        }
      }
    }
  }
}, async (c) => {

  const { code, state } = c.req.valid("query");

  const storedState = getCookie(c, "oauth_state");
  const codeVerifier = getCookie(c, "code_verifier");

  if (!storedState || state !== storedState || !codeVerifier) {
    throw new ApiError(400, "Invalid State");
  }

  const result = await authenticationService.googleCallback(code, codeVerifier);

  const token = generateToken(result.id);

  setCookie(c, "token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return c.redirect("http://localhost:3000/auth/callback") as any;
})

