import { type Context, type Next } from "hono";
import jwt  from "jsonwebtoken"
import { getCookie } from "hono/cookie";
import { ApiError } from "../../utils/apiError.js";

export const authMiddleware  = async (c: Context, next: Next) => {
    const token = getCookie(c,"token");

    // console.log(token);

    if(!token) {
        throw new ApiError(401, "Unauthorized");
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }

    try {
        const decoded = jwt.verify(token,secret) as { userId: string };

        c.set("userId", decoded.userId);

        await next();
    } catch (error) {
        throw new ApiError(401, "Invalid or expired token");
    }
}