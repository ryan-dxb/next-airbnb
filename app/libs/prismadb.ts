import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client =
  globalThis.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },

    log: ["query", "info", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
