import { z } from "@hono/zod-openapi";

export const messageResponseSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  message: z.string(),
  createdAt: z.string().datetime()
});

export const getMessagesParamsSchema = z.object({
  userId: z.string()
});

export const getMessagesResponseSchema = z.array(
  messageResponseSchema
);

export type MessageResponse = z.infer<typeof messageResponseSchema>;