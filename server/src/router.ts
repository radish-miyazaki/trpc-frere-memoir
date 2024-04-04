import { prisma } from "./database/prisma";
import { publicProcedure, router } from "./trpc/init-trpc";
import * as trpcExpress from "@trpc/server/adapters/express";

export const appRouter = router({
  hello: publicProcedure.query(() => "Hello, TRPC!"),
});

export type AppRouter = typeof appRouter;

function createContext({}: trpcExpress.CreateExpressContextOptions) {
  return { prisma };
}

export const trpcMiddleware = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});
