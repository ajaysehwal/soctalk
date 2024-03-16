import mongoose from "mongoose";
const profileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    profile: {
      type: profileSchema,
      default: {},
    },
    connections: [
      {
        _id:String,
        username:String,
      },
     
    ],
    connectionRequests: [
      {
        sender: {
          username: String,
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    myConnectionRequests: [
      {
        recipient: {
          username: String,
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
