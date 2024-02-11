import { Socket } from "socket.io";
import { SocketService } from "../services/sockets";

export class MessageController {
  private socketService: SocketService;
  constructor(socketService: SocketService) {
    this.socketService = socketService;
    this.socketService.onConnection((socket)=>this.handleMessage(socket));
  }

  public handleMessage(socket: Socket) {
    socket.on("message", (message: string) => {
      console.log(message);
      this.socketService.emitter("message", message);
    });
  }
}
