import { Worker } from "bullmq"
import { Message } from "@/models/message.model.js"
import mongoose from "mongoose"
import "dotenv/config";

await mongoose.connect(process.env.MONGO_URI as string);
console.log("worker connected to mongoDB");

export const messageWorker = new Worker(
  "message-queue",
  async (job) => {
    console.log("Processing job:", job.data)
    const { senderId, receiverId, message, fileUrl, fileType } = job.data

    try {
      const payload = await Message.create({
        senderId,
        receiverId,
        message,
        fileUrl: fileUrl || null,      // ← add
        fileType: fileType || null,
      })

      return {
        id: payload._id.toString(),
        senderId,
        receiverId,
        message,
        fileUrl: payload.fileUrl,      // ← add
        fileType: payload.fileType,
        createdAt: payload.createdAt
      }
    } catch (error) {
      console.error("Worker Error (message-queue):", error);
      throw error
    }
  },
  {
    connection: {
        host: "127.0.0.1",
        port: 6379
    }
  }
)