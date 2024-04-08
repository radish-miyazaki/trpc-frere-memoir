import { router } from "../trpc/init-trpc";
import { createBouquet } from "./bonquet-procedure";
import { createFlower } from "./flower-procedure";

export const maintenanceRouter = router({
  createFlower,
  createBouquet,
});
