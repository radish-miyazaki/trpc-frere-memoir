import { router } from "../trpc/init-trpc";
import { createBouquet, getBouquet, getBouquets } from "./bouquet-procedure";
import { createFlower, getFlower, getFlowers } from "./flower-procedure";

export const maintenanceRouter = router({
  createFlower,
  flowers: getFlowers,
  flower: getFlower,
  createBouquet,
  bouquets: getBouquets,
  bouquet: getBouquet,
});
