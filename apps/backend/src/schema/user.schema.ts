import { z } from '@hono/zod-openapi';

export const getCurrentUserResponseSchema = z.object({

  id: z.string(),
  userName: z.string(),
  email: z.email(),
  bio: z.string().nullable().optional(),
  birthDate: z.string().datetime().nullable().optional(),
  postsCount: z.number(),
  followersCount: z.number(),
  followingCount: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()

});

export type GetCurrentUserResponse = z.infer<typeof getCurrentUserResponseSchema>;
export const getAllUsersResponseSchema = z.array(
  getCurrentUserResponseSchema
);