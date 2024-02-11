import { io, Socket } from "socket.io-client";

export class WebSocketServices {
  private socket: Socket;
  constructor(serverUrl: string) {
    this.socket = io(serverUrl);
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.socket.on("connect", () => {
      this.handleConnect();
    });

    this.socket.on("disconnect", () => {
      this.handleDisconnect();
    });

    this.socket.on("serverEvent", (data: any) => {
      console.log(data);
      this.handleServerEvent(data);
    });
  }

  private handleConnect(): void {
    console.log("Connected to the server");
  }

  private handleDisconnect(): void {
    console.log("Disconnected from the server");
  }

  private handleServerEvent(data: any): void {
    console.log("Received data from the server:", data);
  }

  public onDisconnect(callback?: (socket: Socket) => void): void {
    this.socket.disconnect();
  }
  public onConnection(callback?: (socket: Socket) => void): void {
    this.socket.connect();
  }
  public getActiveUserCount(callback: (count: number) => void): void {
    const listener = (count: number) => {
      console.log(count);
      callback(count);
    };

    this.socket.on("activeUserCount", listener);
  }
  
}
