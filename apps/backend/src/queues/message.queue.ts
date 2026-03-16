import { Queue } from "bullmq"

export const messageQueue = new Queue("message-queue", {
    connection: {
        host: "127.0.0.1",
        port: 6379
    }
})