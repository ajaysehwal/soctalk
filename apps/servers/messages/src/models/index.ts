import { PrismaClient, MessageBox } from "@prisma/client";

interface CreateMessageBoxInput {
  message: string;
  senderId: string; // Change the type to match your model
  receiverId: string; // Change the type to match your model
  isRead:boolean,
}

interface UpdateMessageBoxInput {
  text?: string;
}

 class PrismaQuery {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private handlePrismaError(error: any) {
    console.error("Prisma Error:", error);
    return error;
  }

  async createMessage(data: CreateMessageBoxInput): Promise<MessageBox | void> {
    try {
      return await this.prisma.messageBox.create({
        data,
      });
    } catch (error) {
      return this.handlePrismaError(error);
    }
  }

  async getMessageBoxById(id: string) {
    try {
      return await this.prisma.messageBox.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      return this.handlePrismaError(error);
    }
  }

  async updateMessageBox(
    id: string,
    data: UpdateMessageBoxInput
  ): Promise<MessageBox | void> {
    try {
      return await this.prisma.messageBox.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      return this.handlePrismaError(error);
    }
  }

  async deleteMessageBox(id: string): Promise<MessageBox | void> {
    try {
      return await this.prisma.messageBox.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      return this.handlePrismaError(error);
    }
  }

  async getMessageBoxsBySenderId(
    senderId: string,
    receiverId: string
  ): Promise<MessageBox[] | void> {
    try {
      return await this.prisma.messageBox.findMany({
        where: {
          OR: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        },
      });
    } catch (error) {
      return this.handlePrismaError(error);
    }
  }
}

const prismaQuery=new PrismaQuery();
export {prismaQuery};
