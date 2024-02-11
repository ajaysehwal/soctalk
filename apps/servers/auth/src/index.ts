import express from "express";
import { InitAuthRoutes } from "./routes";
import session from "express-session";
import cookieParser from "cookie-parser"; 
import cors from "cors";

async function ServerInitialization() {
  const app = express();
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
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: process.env.SECRETKEY || "secretkey90811@",
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  app.get("/", (req, res) => {
    res.send({ message: "Welcome to soctalk server...." });
  });

  InitAuthRoutes(app);

  const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("Server disconnected gracefully");
      process.exit(0);
    });
  });
}

ServerInitialization();
