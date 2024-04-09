import { Prisma, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export type DBClient = typeof prisma;
export type TransactionClient = Prisma.TransactionClient;
