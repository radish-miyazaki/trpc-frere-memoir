import { addDays, startOfDay } from "date-fns";
import { TRPCError } from "@trpc/server";

import { publicProcedure } from "../trpc/init-trpc";
import { CreatePurchaseInput } from "./api-schema";
import { Purchase, PurchaseDetail, CreatedPurchase } from "./core/types";
import { DBClient, TransactionClient } from "../database/prisma";

function checkIfDeliverable({
  today,
  purchase,
}: {
  today: Date;
  purchase: Purchase;
}): boolean {
  const maxDeliveryDays = Math.max(
    ...purchase.purchaseDetails.map((detail) => detail.flower.deliveryDays)
  );

  // 納品希望日時が、発注リードタイムを足した日付よりも前だと発注不可
  if (
    startOfDay(purchase.deliveryDate) <
    startOfDay(addDays(today, maxDeliveryDays))
  )
    return false;

  return true;
}

async function sendOrderEmail(): Promise<void> {
  // TODO: メール送信処理を実装する
}

async function validatePurchase(
  prisma: DBClient,
  input: CreatePurchaseInput
): Promise<Purchase> {
  const flowerIdList = input.details.map((detail) => detail.flowerId);
  const flowers = await prisma.flower.findMany({
    where: { id: { in: flowerIdList } },
  });
  const flowerMap = new Map(flowers.map((flower) => [flower.id, flower]));
  const purchaseDetails: PurchaseDetail[] = input.details.map((detail) => {
    const flower = flowerMap.get(detail.flowerId);
    if (flower === undefined) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "花 ID が正しくありません",
      });
    }

    return { ...detail, flower };
  });

  const purchase: Purchase = {
    deliveryDate: new Date(input.deliveryDate),
    purchaseDetails,
  };

  if (!checkIfDeliverable({ today: new Date(), purchase })) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "納品希望日には、発注リードタイムより後の日付を入力してください",
    });
  }

  return purchase;
}

async function persistPurchase(
  tx: TransactionClient,
  validatedPurchase: Purchase
): Promise<CreatedPurchase> {
  const purchase = await tx.purchase.create({
    include: {
      purchaseDetails: { include: { flower: true } },
    },
    data: {
      deliveryDate: validatedPurchase.deliveryDate,
      purchaseDetails: {
        createMany: {
          data: validatedPurchase.purchaseDetails.map((detail) => ({
            flowerId: detail.flower.id,
            orderQuantity: detail.orderQuantity,
          })),
        },
      },
    },
  });

  return purchase;
}

export const createPurchase = publicProcedure
  .input(CreatePurchaseInput)
  .mutation(async ({ ctx, input }) => {
    const validatedPurchase = await validatePurchase(ctx.prisma, input);

    const purchase = await ctx.prisma.$transaction(async (tx) => {
      const purchase = await persistPurchase(tx, validatedPurchase);
      await sendOrderEmail();

      return purchase;
    });

    return purchase;
  });
