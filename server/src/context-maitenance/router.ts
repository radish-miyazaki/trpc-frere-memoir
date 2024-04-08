import { router } from "../trpc/init-trpc";
import { createBonquet } from "./bonquet-procedure";
import { createFlower } from "./flower-procedure";

export const maintenanceRouter = router({
  createFlower,
  createBonquet,
});
