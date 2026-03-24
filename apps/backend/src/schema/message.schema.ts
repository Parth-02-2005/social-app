import { z } from "@hono/zod-openapi";

export const messageResponseSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  message: z.string(),
  fileUrl: z.string().nullable().optional(),
  fileType: z.enum(["image", "pdf"]).nullable().optional(),
  createdAt: z.string().datetime()
});

export const getMessagesParamsSchema = z.object({
  userId: z.string()
});

export const getMessagesResponseSchema = z.array(
  messageResponseSchema
);

export const sendMessageSchema = z.object({
  receiverId: z.string(),
  message: z.string().optional().default(""),
  fileUrl: z.string().nullable().optional(),
  fileType: z.enum(["image", "pdf"]).nullable().optional(),
});

export const uploadFileBodySchema = z.object({
  file: z.any()
});

export const uploadFileResponseSchema = z.object({
  url: z.string(),
  publicId: z.string(),
  fileType: z.enum(["image", "pdf"])
});

export type MessageResponse = z.infer<typeof messageResponseSchema>;
export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type UploadFileResponse = z.infer<typeof uploadFileResponseSchema>;
