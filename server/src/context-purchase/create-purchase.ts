import { addDays, startOfDay } from "date-fns";
import { TRPCError } from "@trpc/server";

import { publicProcedure } from "../trpc/init-trpc";
import { CreatePurchaseInput } from "./api-schema";

function checkIfDeliverable({
  today,
  deliveryDate,
  maxDeliveryDays,
}: {
  today: Date;
  deliveryDate: Date;
  maxDeliveryDays: number | null;
}): boolean {
  if (maxDeliveryDays === null) return false;

  // 納品希望日時が、発注リードタイムを足した日付よりも前だと発注不可
  if (startOfDay(deliveryDate) < startOfDay(addDays(today, maxDeliveryDays)))
    return false;

  return true;
}

async function sendOrderEmail(): Promise<void> {
  // TODO: メール送信処理を実装する
}

export const createPurchase = publicProcedure
  .input(CreatePurchaseInput)
  .mutation(async ({ ctx, input }) => {
    const flowerIdList = input.details.map((detail) => detail.flowerId);
    const maxDeliveryDays = await ctx.prisma.flower.aggregate({
      _max: { deliveryDays: true },
      where: {
        id: { in: flowerIdList },
      },
    });

    if (
      !checkIfDeliverable({
        today: new Date(),
        deliveryDate: new Date(input.deliveryDate),
        maxDeliveryDays: maxDeliveryDays._max.deliveryDays,
      })
    ) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message:
          "納品希望日には、発注リードタイムより後の日付を入力してください",
      });
    }

    const purchase = await ctx.prisma.$transaction(async (tx) => {
      const purchase = tx.purchase.create({
        data: {
          deliveryDate: new Date(input.deliveryDate),
          purchasesDetails: {
            createMany: {
              data: input.details,
            },
          },
        },
      });

      await sendOrderEmail();

      return purchase;
    });

    return purchase;
  });
