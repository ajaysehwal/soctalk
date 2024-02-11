import { Socket } from "socket.io";
import {SocketService} from "../services/sockets"
export class ActiveUserCounter{
    private connectedUsers: Set<string>;
    private socketService:SocketService
   constructor(socketService:SocketService){
    this.connectedUsers = new Set();
    this.socketService=socketService;
   }
 
 private Counter(): void {
    const userCount = this.connectedUsers.size;
    this.socketService.emitter("activeUserCount", userCount);
    this.socketService.onConnection((socket)=>this.handleUserConnected(socket))
    this.socketService.onDisconnection((socket)=>this.handleUserDisconnected(socket));
  }
  private handleUserConnected(socket: Socket): void {
    if (!this.connectedUsers.has(socket.id)) {
      this.connectedUsers.add(socket.id);
      this.Counter();
    }
  }
  public activeUserCount(callback: (userCount: number) => void): void {
    callback(this.connectedUsers.size);
  }
  
  
  private handleUserDisconnected(socket: Socket): void {
    if (this.connectedUsers.has(socket.id)) {
      this.connectedUsers.delete(socket.id);
      this.Counter();

    }
  }
  public getConnectedUsers(): Set<string> {
    return this.connectedUsers;
  }
}