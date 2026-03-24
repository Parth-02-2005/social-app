import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { messageQueue } from "@/queues/message.queue.js";
import { queueEvents } from "@/queues/queue.event.js";

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

type MessagePayload = {
  id: string
  senderId: string
  receiverId: string
  message: string
  fileUrl: string | null    
  fileType: string | null
  createdAt: string
}

export const registerChatSocket = (io: Server) => {
  // Authentication Middleware
  io.use((socket: AuthenticatedSocket, next) => {

    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Unauthorized"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
      socket.userId = decoded.userId;
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  queueEvents.on("completed", ({ returnvalue }) => {

    console.log(returnvalue);
    
      const payload: MessagePayload =
    typeof returnvalue === "string"
      ? JSON.parse(returnvalue)
      : returnvalue

      console.log("Emit Messages:", payload)

      io.to(payload.senderId)
        .to(payload.receiverId)
        .emit("receive_message", payload)
    })

  io.on("connection", (socket: AuthenticatedSocket) => {

    const userId = socket.userId
      if (!userId) {
        console.error("User ID missing on socket")
        socket.disconnect()
        return
      }
    socket.join(userId)

    console.log(`User connected: ${socket.userId}`);

    // Handle sending messages
    socket.on("send_message", async ({ receiverId, message, fileUrl, fileType }) => {
      // const roomId = getChatRoomId(senderId, receiverId);

      const senderId = socket.userId

      // console.log("SEND MESSAGE ROOM:", roomId);

      if(!senderId) return

      await messageQueue.add("send_message", {
        senderId,
        receiverId,
        message,
        fileUrl: fileUrl || null,
        fileType: fileType || null,
      })
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.userId}`);
    });
  });
};
