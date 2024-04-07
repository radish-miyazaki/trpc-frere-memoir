import * as trpcExpress from "@trpc/server/adapters/express";

import { maintenanceRouter } from "./context-maitenance/router";
import { prisma } from "./database/prisma";
import { mergeRouters } from "./trpc/init-trpc";

export const appRouter = mergeRouters(maintenanceRouter);

export type AppRouter = typeof appRouter;

function createContext({}: trpcExpress.CreateExpressContextOptions) {
  return { prisma };
}

export const trpcMiddleware = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});
