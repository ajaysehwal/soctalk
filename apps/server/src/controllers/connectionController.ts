import { Socket } from "socket.io";
import { User } from "../models";

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

        await Promise.all([Sender.save(), Recipient.save()]);

        const latestRequest = Recipient.connectionRequests.slice(-1)[0];
        if (recipientSocket) {
          this.socket
            .to(recipientSocket)
            .emit("receivedConnectionRequest", latestRequest);
        }

        console.log("New connection request added:", latestRequest);
      } catch (error) {
        console.error("Error handling connection request:", error);
        // Emit error event or handle error appropriately
      }
    });
  }

  private async handleAcceptRequest(): Promise<void> {
    this.socket.on(
      "acceptConnectionRequest",
      async (data: { status: "Accepted"; _id: any; senderId: string }) => {
        try {
          const { senderId, _id } = data;

          const [requestSender, requestAccepter] = await Promise.all([
            User.findById(senderId),
            User.findById(this.userId),
          ]);

          if (!requestSender || !requestAccepter) {
            throw new Error("Sender or accepter not found.");
          }

          const requestDeleteFromAccepterIndex =
            requestAccepter.connectionRequests.findIndex(
              (request) => String(request?._id) === _id
            );

          if (requestDeleteFromAccepterIndex !== -1) {
            requestAccepter.connectionRequests.splice(
              requestDeleteFromAccepterIndex,
              1
            );
          }

          requestSender.connections.push({
            _id: this.userId,
            username: requestAccepter.username,
          });
          requestAccepter.connections.push({
            _id: senderId,
            username: requestSender.username,
          });

          await Promise.all([requestSender.save(), requestAccepter.save()]);
          console.log(
            "Connection request accepted and connection established."
          );
        } catch (error) {
          console.error("Error handling connection acceptance:", error);
        }
      }
    );
  }

  private findRecipientSocket(recipientId: string): string | undefined {
    return this.activeUsers.get(recipientId);
  }
  // private sendNotificationAfterAccept(){
  // }

  private initMethods(): void {
    this.handleRequests();
    this.handleAcceptRequest();
  }
}
