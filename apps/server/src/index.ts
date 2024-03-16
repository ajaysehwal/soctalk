import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initAuthRoutes, InitUserDataRoutes } from "./routes";
import http from "http";
import { DB_connection } from "./config/mongodb";
import "dotenv/config";
import SocketManager from "./services/socket";
import { User } from "./models";
async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const PORT = process.env.PORT ? process.env.PORT : 8000;
  const whitelist = ["http://localhost:3000"];
  const corsOptions = {
    origin: function (origin: any, callback: any) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());
  DB_connection();
  app.get("/", (req, res) => {
    res.send({ _response: "Welcome to soctalk chat tests center" });
  });
  initAuthRoutes(app);
  InitUserDataRoutes(app);
  const socketService = new SocketManager();
  socketService.io.use(async (socket, next) => {
    try {
      const userId: any = socket.handshake.query.userId;
      const user = await User.findById(userId);
      if (user) {
        next();
      } else {
        next(new Error("User not found"));
      }
    } catch (err: any) {
      throw new Error(err);
    }
  });
  socketService.io.attach(server);

  socketService.InitializeSocket();
  const App = server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
  process.on("SIGTERM", () => {
    App.close(() => {
      console.log("Server disconnected gracefully");
      process.exit(0);
    });
  });
}

startServer();
