import { Socket } from "socket.io";
import { Message, Conversation } from "../models";

export class MessageController {
  private readonly socket: Socket;
  private readonly senderId: string;
  private readonly activeUsers: Map<any, any>;
  constructor(socket: Socket, activeUsers: Map<any, any>, senderId: string) {
    this.socket = socket;
    this.senderId = senderId;
    this.activeUsers = activeUsers;
    this.init();
  }

  private init() {
    console.log("Initializing Message Controller");
    this.setupMessageListeners();
  }

  private setupMessageListeners() {
    this.socket.on("sendMessage", async (data) => {
      try {
        const { recipient, content, sender } = data;

        const newMessage = await this.saveMessage({
          content,
          sender,
          recipient,
        });

        this.socket.emit("getMessage", newMessage);

        const recipientSocket = this.findRecipientSocket(recipient);
        if (recipientSocket) {
          this.socket.to(recipientSocket).emit("receivedMessage", newMessage);
        }
      } catch (error) {
        console.error("Error while sending message:", error);
      }
    });

    this.socket.on("requestMessages", async (recipientId, callback) => {
      try {
        const messages = await this.getMessagesBetweenUsers(
          this.senderId,
          recipientId
        );
        callback(messages);
      } catch (error) {
        console.error("Error while getting messages:", error);
      }
    });
  }

  private async saveMessage(data: {
    content: string;
    sender: string;
    recipient: string;
  }) {
    const { sender, recipient, content } = data;
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, recipient] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, recipient],
      });
    }

    const message = new Message({
      content,
      sender,
      recipient,
      timestamp: Date.now(),
    });

    conversation.messages.push(message._id);
    await Promise.all([conversation.save(), message.save()]);

    return message;
  }

  private async getMessagesBetweenUsers(senderId: string, recipientId: string) {
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId] },
    }).populate("messages");
    return conversation?.messages || [];
  }

  private findRecipientSocket(recipientId: string) {
    if (recipientId) {
      return this.activeUsers.get(recipientId);
    }
    return null;
  }
}
