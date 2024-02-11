import { Server, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import { EventEmitter } from "events";

export class SocketService extends EventEmitter {
  private readonly _io: Server;

  constructor(server: HTTPServer) {
    super();
    this._io = new Server(server, {
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    this.onConnection((socket) => this.handledisconnection(socket));
  }
  private handledisconnection(socket: Socket) {
    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  }
  public onConnection(callback: (socket: Socket) => void) {
    this.io.on("connection", callback);
  }

  public onDisconnection(callback: (socket: Socket) => void): void {
    this.io.on("disconnection", callback);
  }
  public emitter(event: string, data: any) {
    console.log(event,data);
     this.io.emit(event, data);
  }
  get io(): Server {
    return this._io;
  }
}
