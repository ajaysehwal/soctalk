import { Server, Socket } from "socket.io";
import {
  MessageController,
  UserController,
  ConnectionRequest,
} from "../controllers";
class SocketManager {
  private _io: Server;
  public activeUsers = new Map();
  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }
  async InitializeSocket() {
    console.log("Init Sockets Successfully");
    const io = this.io;
    io.on("connection", (socket: Socket) => {
      const userId: any = socket.handshake.query.userId;
      socket.join(userId);
      this.activeUsers.set(userId, socket.id);
      console.log(this.activeUsers);
      this.SocketControllers(socket, userId);
      socket.on("disconnect", () => {
        this.activeUsers.delete(userId);
        console.log(this.activeUsers);

        console.log("user disconnect", socket.id);
      });
    });
  }

  get io(): Server {
    return this._io;
  }
  SocketControllers(socket: Socket, senderId: string) {
    new MessageController(socket, this.activeUsers, senderId);
    const userController = new UserController();
    userController.UserDataProvider(senderId, socket);
    new ConnectionRequest(socket, this.activeUsers,senderId);


  }
}

export default SocketManager;
