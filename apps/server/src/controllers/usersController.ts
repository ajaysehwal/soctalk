import { Request, Response } from "express";
import { User } from "../models";
import { Socket } from "socket.io";
import { JwtDecoder } from "../utils";
export class UserController {
 
  async getAllUsers(req: Request, res: Response) {
    try {
      const token = req.header("X-Authorization");
      const decodedID = JwtDecoder(token);
      if (decodedID && /^[0-9a-fA-F]{24}$/.test(decodedID)) {
        const user = await User.findById(decodedID);
        const userConnections = user?.connections || [];
        const query = {
          _id: { $nin: [decodedID, ...userConnections] },
        };
        const users = await User.find(query);
        res.status(200).json({ response: users });
      } else {
        res.status(400).json({ response: "Invalid user ID" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ response: "Internal Server Error" });
    }
  }
  async UserDataProvider(Id: any,socket:Socket) {
    const user = await User.findById({ _id: Id });
    this.getconnectionRequest(user,socket);
    this.getConnections(user,socket);
  }
  async getconnectionRequest(user: any,socket:Socket) {
    if (user) {
      const data = user.connectionRequests;
       socket?.emit("getconnectionRequest", data);
    }
  }
  async getConnections(user: any,socket:Socket) {
    if (user) {
      const connections = user.connections;
      socket?.emit("getconnections", connections);
    }
  }
}
