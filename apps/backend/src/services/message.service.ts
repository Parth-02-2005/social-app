import { Message } from "@/models/message.model.js";
import { getMessagesResponseSchema } from "@/schema/message.schema.js";
import { Types } from "mongoose";

export class MessageService {

  async getMessages(currentUserId: string, otherUserId: string) {

    const messages = await Message.find({
      $or: [
        {
          senderId: new Types.ObjectId(currentUserId),
          receiverId: new Types.ObjectId(otherUserId),
        },
        {
          senderId: new Types.ObjectId(otherUserId),
          receiverId: new Types.ObjectId(currentUserId),
        },
      ],
    })
    .sort({ createdAt: 1 });

    const response = messages.map((msg) => ({
      id: msg._id.toString(),
      senderId: msg.senderId.toString(),
      receiverId: msg.receiverId.toString(),
      message: msg.message,
      createdAt: msg.createdAt.toISOString(),
    }));

    return getMessagesResponseSchema.parse(response);
  }
}