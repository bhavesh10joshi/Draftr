// packages/database/src/index.ts
import { PrismaClient } from "./generated/client/index.js";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();


export * from "./generated/client/index.js";