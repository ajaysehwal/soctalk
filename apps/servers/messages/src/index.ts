import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { SocketService } from "./services/sockets";
import http from "http";
import {
  ActiveUserCounter,
  MessageController,
  UserStatusController,
} from "./controllers";
async function main() {
  const httpServer = http.createServer();
  const socketService = new SocketService(httpServer);
  socketService.io?.attach(httpServer);
  new ActiveUserCounter(socketService);
  new UserStatusController(socketService);
  new MessageController(socketService);
  const PORT = process.env.PORT ? process.env.PORT : 7000;
  httpServer.listen(PORT, () => {
    console.log(`Message Server running on ${PORT}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// const messages = await prisma.messageBox.create({
//     data: {
//         message: 'ajaysehwal',
//         isRead: true,
//         senderId: 'jdshjhd',
//         receiverId: 'hsdxjhjwd',
//     },
//   })
//   console.log(messages)
