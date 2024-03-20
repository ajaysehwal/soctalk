import { Socket } from "socket.io";
import { User } from "../models";
import { request } from "http";

interface IRequest {
  RequestType: string;
  recipient: any; // Define recipient type as per your schema
  sender: any; // Define sender type as per your schema
}

export class ConnectionRequest {
  private socket: Socket;
  private activeUsers: Map<string, string>;
  private userId: string;

  constructor(
    socket: Socket,
    activeUsers: Map<string, string>,
    userId: string
  ) {
    this.userId = userId;
    this.socket = socket;
    this.activeUsers = activeUsers;
    this.initMethods();
  }

  private async handleRequests(): Promise<void> {
    this.socket.on("connectionRequest", async (request: IRequest) => {
      try {
        const recipientId = request?.recipient?._id;
        const senderId = request.sender._id;
        const Recipient = await User.findById(recipientId);
        const Sender = await User.findById(senderId);
        const recipientSocket = this.findRecipientSocket(recipientId);
        if (!Recipient) {
          throw new Error("Recipient user not found.");
        }
        if (!Sender) {
          throw new Error("Sender user is not valid");
        }
        const existingRequest = Sender.myConnectionRequests.find(
          (req) => req.recipient?._id?.toString() === recipientId
        );
        if (existingRequest) {
          throw new Error("Already Send");
        }

        Sender.myConnectionRequests.push({
          RequestType: request.RequestType,
          recipient: request.recipient,
        });
        Recipient.connectionRequests.push({
          sender: request.sender,
        });
        const latestConnectionRequest = Recipient.connectionRequests.slice(-1)[0];
        Recipient.notifications.push({
          Type: "connection_request",
          notification: latestConnectionRequest,
        });
        const notify = Recipient.notifications.slice(-1)[0];

        console.log("notify------------", notify);
        if (recipientSocket) {
          this.socket.to(recipientSocket).emit("notification", notify);
        }
        await Promise.all([Sender.save(), Recipient.save()]);

        console.log("New connection request added:", notify);
      } catch (error) {
        console.error("Error handling connection request:", error);
        // Emit error event or handle error appropriately
      }
    });
  }

  private async handleResponse(): Promise<void> {
    this.socket.on(
      "ConnectionResponse",
      async (data: { status: string; _id: any; senderId: string }) => {
        try {
          const { status, senderId, _id } = data;
          const [requestSender, requestAccepter] = await Promise.all([
            User.findById(senderId),
            User.findById(this.userId),
          ]);
          if (!requestSender || !requestAccepter) {
            throw new Error("Sender or accepter not found.");
          }
          const requestAccepterRequestDeleteIndex =
            requestAccepter?.connectionRequests.findIndex(
              (request) => String(request?._id) === _id
            );
          if (requestAccepterRequestDeleteIndex !== -1) {
            requestAccepter.connectionRequests.splice(
              requestAccepterRequestDeleteIndex,
              1
            );
          }
          const SenderRequestFind = requestSender?.myConnectionRequests.find(
            (request) => String(request?.recipient?._id) === this.userId
          );
          const senderSocket = this.findRecipientSocket(senderId);

          if (status === "rejected") {
            if (SenderRequestFind) {
              SenderRequestFind.status = "rejected";
              if (senderSocket) {
                const notification = SenderRequestFind;
                const notify = requestSender.notifications.push({
                  Type: "connection_response",
                  notification: notification,
                });
                this.socket.to(senderSocket).emit("notification", notify);
              }
            } else {
              throw new Error("Not Found SenderRequest in database");
            }
          } else {
            if (SenderRequestFind) {
              SenderRequestFind.status = "accepted";
              if (senderSocket) {
                const notification = SenderRequestFind;
                const notify = requestSender.notifications.push({
                  Type: "connection_response",
                  notification: notification,
                });
                this.socket.to(senderSocket).emit("notification", notify);
              }
              requestSender.connections.push({
                _id: this.userId,
                username: requestAccepter.username,
              });
              requestAccepter.connections.push({
                _id: senderId,
                username: requestSender.username,
              });
            }
          }
          await Promise.all([requestSender.save(), requestAccepter.save()]);

          console.log(
            "Connection request accept or decline upto users response and connection established."
          );
        } catch (error) {
          console.error("Error handling connection acceptance:", error);
        }
      }
    );
  }

  private findRecipientSocket(recipientId: string): string | undefined {
    if (recipientId) {
      return this.activeUsers.get(recipientId);
    }
    return undefined;
  }
  private findSenderSocket(): string | undefined {
    if (this.userId) {
      return this.activeUsers.get(this.userId);
    }
    return undefined;
  }

  private initMethods(): void {
    this.handleRequests();
    this.handleResponse();
  }
}
