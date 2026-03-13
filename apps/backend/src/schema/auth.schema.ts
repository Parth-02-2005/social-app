import { z } from '@hono/zod-openapi';

export const loginSchemaBody = z.object({
    email: z.email(),
    password: z.string()
});

export const loginResponseSchema = z.object({
    id: z.string(),
    userName: z.string(),
    email: z.string(),
    token: z.string()
});

export const registerSchemaBody = z.object({
    userName: z.string()    
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must be at most 30 characters'),
    email: z.email('Please use a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    bio: z.string().max(200).optional(),
    birthDate: z.string().optional(),
    // avatar: z.instanceof(File).optional(),  
});

export const registerResponseSchema = z.object({
    id: z.string(),
    userName: z.string(),
    email: z.email(),
    bio: z.string().optional(),
    avatarUrl: z.string().optional(),
    birthDate: z.string().date().optional(),
    postsCount: z.number(),
    followersCount: z.number(),
    followingCount: z.number(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

export const responseSchema = z.object({
    id: z.string(),
    userName: z.string(),
    email: z.email(),
})

export type RegisterBody = z.infer<typeof registerSchemaBody>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
export type LoginBody = z.infer<typeof loginSchemaBody>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
