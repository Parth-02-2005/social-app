import { OpenAPIHono } from "@hono/zod-openapi";
import type { Variables } from "@/types/hono.types.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";
import { UserService } from "@/services/user.service.js";
import { getAllUsersResponseSchema, getCurrentUserResponseSchema } from "@/schema/user.schema.js";

export const userRouter = new OpenAPIHono<{ Variables: Variables }>();

const userService = new UserService();

userRouter.openapi(
  {
    method: "get",
    path: "/me",
    tags: ["Users"],
    middleware: [authMiddleware],
    responses: {
      200: {
        description: "Current user profile",
        content: {
          "application/json": {
            schema: getCurrentUserResponseSchema
          }
        }
      }
    }
  },
  async (c) => {
      const userId = c.get("userId");

      const user = await userService.getCurrentUser(userId);

      return c.json(user, 200);
  }
);

userRouter.openapi({
    method: "get",
    path: "/",
    tags: ["Users"],
    middleware: [authMiddleware],
    responses: {
      200: {
        description: "Current user profile",
        content: {
          "application/json": {
            schema: getAllUsersResponseSchema
          }
        }
      }
    }
}, async (c) => {
    const userId = c.get("userId");

    const users = await userService.getAllUsers(userId);

    return c.json(users, 200);
})