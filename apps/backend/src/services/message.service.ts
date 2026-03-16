import { Message } from "@/models/message.model.js";
import { getMessagesResponseSchema } from "@/schema/message.schema.js";
import { Types } from "mongoose";

export class MessageService {

  async getMessages(currentUserId: string, otherUserId: string) {

     const sender = new Types.ObjectId(currentUserId);
    const receiver = new Types.ObjectId(otherUserId);

        const messages = await Message.find({
      $or: [
        { senderId: sender, receiverId: receiver },
        { senderId: receiver, receiverId: sender },
      ],
    })
    .sort({ createdAt: 1 })

      // console.log("currentUserId:", currentUserId, typeof currentUserId);
      // console.log("otherUserId:", otherUserId, typeof otherUserId);
      // console.log("QUERY sender:", sender, "receiver:", receiver);
      // console.log("FOUND:", messages.length);

    // console.log(message);

    const response = messages.map((msg) => ({
      id: msg._id.toString(),
      senderId: msg.senderId.toString(),
      receiverId: msg.receiverId.toString(),
      message: msg.message,
      createdAt: msg.createdAt.toISOString(),
    }));

    // console.log("currentUserId:", currentUserId, typeof currentUserId)
    // console.log("otherUserId:", otherUserId, typeof otherUserId)

    // console.log("QUERY", sender, receiver);
    // console.log("FOUND", messages.length);

    // console.log(response);

    return getMessagesResponseSchema.parse(response);
  }
}