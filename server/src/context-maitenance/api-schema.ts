import { z } from "zod";

export const CreateFlowerInput = z.object({
  flowerCode: z.string(),
  name: z.string(),
  deliveryDays: z.number(),
  purchaseQuantity: z.number(),
  maintanableDays: z.number(),
});

export const BonquetDetail = z.object({
  flowerId: z.number(),
  flowerQuantity: z.number(),
});

export const CreateBonquetInput = z.object({
  bonquetCode: z.string(),
  name: z.string(),
  bonquetDetails: z.array(BonquetDetail).min(1),
});
