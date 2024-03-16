import mongoose from "mongoose";

 const messageSchema = new mongoose.Schema(
  {
    content: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    timestamp:Date
  },
  { timestamps: true }
);

export const Message = mongoose.model("message", messageSchema);

  