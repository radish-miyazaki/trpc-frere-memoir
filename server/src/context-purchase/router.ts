import { router } from "../trpc/init-trpc";
import { createPurchase } from "./create-purchase";
import { reigsterArrival } from "./register-arrival";

export const purchaseRouter = router({
  createPurchase,
  reigsterArrival,
});
