import { OpenAPIHono } from "@hono/zod-openapi";
import { authenticationRouter } from "@/controllers/authentication.controller.js";
import { userRouter } from "./controllers/user.controller.js";
import { messageRouter } from "./controllers/message.controller.js";

export const router = (app: OpenAPIHono) => {

    app.route('/api/v1/auth', authenticationRouter);
    app.route('/api/v1/users', userRouter);
    app.route("/api/v1/messages", messageRouter);

}