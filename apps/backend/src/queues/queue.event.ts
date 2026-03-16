import { QueueEvents } from "bullmq"

export const queueEvents = new QueueEvents("message-queue", {
  connection: {
    host: "127.0.0.1",
    port: 6379
  }
})