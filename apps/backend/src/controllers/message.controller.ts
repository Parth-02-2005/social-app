  import { OpenAPIHono } from "@hono/zod-openapi";
  import { authMiddleware } from "@/middlewares/auth.middleware.js";
  import {
    getMessagesParamsSchema,
    getMessagesResponseSchema,
    uploadFileBodySchema,
    uploadFileResponseSchema
  } from "@/schema/message.schema.js";
  import { MessageService } from "@/services/message.service.js";
  import type { Variables } from "@/types/hono.types.js";
  import { ApiError } from "@/utils/apiError.js";
  import { uploadOnCloudinary } from "@/utils/cloudinary.js";

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

  messageRouter.openapi(
  {
    method: "post",
    path: "/upload",
    tags: ["Messages"],
    middleware: [authMiddleware],
    request: {
      body: {
        content: {
          "multipart/form-data": {
            schema: uploadFileBodySchema
          }
        }
      }
    },
    responses: {
      200: {
        description: "File uploaded successfully",
        content: {
          "application/json": {
            schema: uploadFileResponseSchema
          }
        }
      }
    }
  },
  async (c) => {
    const body = await c.req.parseBody()
    const file = body["file"]

    if (!file || typeof file === "string") {
      throw new ApiError(400, "No file provided")
    }

    const result = await uploadOnCloudinary(file as File)
    return c.json(result, 200)
  }
);

