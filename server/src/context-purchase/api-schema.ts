import { z } from "zod";

function isValidDate(date: Date): boolean {
  return !Number.isNaN(date.getTime());
}

export const DateString = z
  .string()
  .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, {
    message: "日付は YYYY-MM-DD の形式で入力してください",
  })
  .refine((arg) => isValidDate(new Date(arg)), {
    message: "有効な日付を入力してください",
  });

const PurchaseDetail = z.object({
  flowerId: z.number(),
  orderQuantity: z.number().min(0),
});

export const CreatePurchaseInput = z.object({
  deliveryDate: DateString,
  details: z.array(PurchaseDetail).min(1),
});

export type CreatePurchaseInput = z.infer<typeof CreatePurchaseInput>;

export const RegisterArrivalInput = z.object({
  purchaseId: z.number(),
});

export type RegisterArrivalInput = z.infer<typeof RegisterArrivalInput>;
