import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@frere-memoir/server/src/router";

export const trpc = createTRPCReact<AppRouter>();
