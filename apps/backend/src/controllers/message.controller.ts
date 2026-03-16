  import { OpenAPIHono } from "@hono/zod-openapi";
  import { authMiddleware } from "@/middlewares/auth.middleware.js";
  import {
    getMessagesParamsSchema,
    getMessagesResponseSchema
  } from "@/schema/message.schema.js";
  import { MessageService } from "@/services/message.service.js";
  import type { Variables } from "@/types/hono.types.js";

  export const messageRouter = new OpenAPIHono<{ Variables: Variables }>();

  const messageService = new MessageService();

  messageRouter.openapi(
    {
      method: "get",
      path: "/:userId",
      tags: ["Messages"],
      middleware: [authMiddleware],
      request: {
        params: getMessagesParamsSchema
      },
      responses: {
        200: {
          description: "Chat history",
          content: {
            "application/json": {
              schema: getMessagesResponseSchema
            }
          }
        }
      }
    },
    async (c) => {

      const currentUserId = c.get("userId");

      const { userId } = c.req.valid("param");

      console.log("currentUserId:", currentUserId);
      console.log("otherUserId:", userId);

      const messages = await messageService.getMessages(
        currentUserId,
        userId
      );

      return c.json(messages, 200);
    }
  );  

