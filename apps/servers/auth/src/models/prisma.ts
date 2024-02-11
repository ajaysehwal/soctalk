import { PrismaClient, Authentication } from "@prisma/client";
class PrismaQuery {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({
      log: ["query"],
    });
  }

  async createUser(username: string, password: string) {
    return await this.prisma.authentication.create({
      data: {
        username,
        password,
      },
    });
  }
  async findUserByUsername(username: string): Promise<Authentication | null> {
    return this.prisma.authentication.findUnique({
      where: { username },
    });
  }

  async findUserById(id: string): Promise<Authentication | null> {
    return this.prisma.authentication.findUnique({
      where: { id },
    });
  }
}

export default PrismaQuery;
