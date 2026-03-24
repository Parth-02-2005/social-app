import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMessage extends Document {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  message: string;
  fileUrl: string | null;        
  fileType: "image" | "pdf" | null;  
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
  fileUrl: {           
    type: String,
    default: null,
  },
  fileType: {          
    type: String,
    enum: ["image", "pdf", null],
    default: null,
  },
}, { timestamps: true });

export const Message = mongoose.model<IMessage>("Message", messageSchema);