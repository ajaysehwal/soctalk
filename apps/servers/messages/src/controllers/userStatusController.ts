import { SocketService } from "../services/sockets";
import { Socket } from "socket.io";
export interface UserStatus {
  userId: string;
  status: "online" | "offline";
}
export class UserStatusController {
  private socketService: SocketService;
  constructor(socketservice: SocketService) {
    this.socketService = socketservice;
    this.socketService.onConnection((socket) =>
      this.handleUserConnectionStatus(socket)
    );
    this.socketService.onDisconnection((socket) =>
      this.handleUserDisconnectionStatus(socket)
    );
  }
  private handleUserConnectionStatus(socket: Socket): void {
    try {
        this.socketService.emitter("userStatus", {
        userId: socket.id,
        status: "online",
      });
    } catch (err) {
      console.log(
        "Sorry there is error in user connection status updation",
        err
      );
    }
  }
  private handleUserDisconnectionStatus(socket: Socket): void {
    try {
      console.log("WebSocket:User disconnected-", socket.id);
      this.socketService.emitter("userStatus", {
        userId: socket.id,
        status: "offline",
      });
    } catch (err) {
      console.log("Error during user disconnection Login:", err);
    }
  }
}
