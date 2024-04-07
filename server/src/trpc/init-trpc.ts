import { initTRPC } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";

export type Context = {
  prisma: PrismaClient;
};

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
