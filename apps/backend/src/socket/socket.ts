import { Server, Socket } from "socket.io";
import { Message } from "@/models/message.model.js";
import { getChatRoomId } from "../../utils/chatRoom.js";
import jwt from "jsonwebtoken";

interface AuthenticatedSocket extends Socket {
  userId?: string;
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

  io.on("connection", (socket: AuthenticatedSocket) => {

    const userId = socket.userId
      if (!userId) {
        console.error("User ID missing on socket")
        socket.disconnect()
        return
      }
    socket.join(userId)

    console.log(`User connected: ${socket.userId}`);

    // Join a private room for 1:1 chat
    socket.on("join_chat", async ({ senderId, receiverId }) => {
      console.log("senderId", senderId);
      console.log("receiverId", receiverId);
      const roomId = await getChatRoomId(senderId, receiverId);
      console.log("JOIN ROOM:", roomId)
      socket.join(roomId);
    });

    // Handle sending messages
    socket.on("send_message", async ({ senderId, receiverId, message }) => {
      const roomId = getChatRoomId(senderId, receiverId);

      console.log("SEND MESSAGE ROOM:", roomId)

      try {
        const newMessage = await Message.create({ senderId, receiverId, message });

        const payload = {
          id: newMessage._id.toString(),
          senderId,
          receiverId,
          message,
          createdAt: newMessage.createdAt,
        };

        // Broadcast to both users in the room
        io.to(roomId).emit("receive_message", payload);
      } catch (error) {
        console.error("Socket Error (send_message):", error);
      }
    });

    socket.on("receive_message", (payload) => {
      console.log("RECEIVED:", payload)
    })

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.userId}`);
    });
  });
};
