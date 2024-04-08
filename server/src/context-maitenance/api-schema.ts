import { z } from "zod";

export const CreateFlowerInput = z.object({
  flowerCode: z.string(),
  name: z.string(),
  deliveryDays: z.number(),
  purchaseQuantity: z.number(),
  maintanableDays: z.number(),
});

export const BouquetDetail = z.object({
  flowerId: z.number(),
  flowerQuantity: z.number(),
});

export const CreateBouquetInput = z.object({
  bouquetCode: z.string(),
  name: z.string(),
  bouquetDetails: z.array(BouquetDetail).min(1),
});
