import { DBClient, TransactionClient } from "../database/prisma";
import { publicProcedure } from "../trpc/init-trpc";
import { formatDate } from "../utils/date";
import { RegisterArrivalInput } from "./api-schema";
import { PurchaseArrival } from "./core/types";

type ArrivalWithPurchaseDetails = PurchaseArrival & {
  purchaseDetails: { flowerId: number; orderQuantity: number }[];
};

async function persistArrival(
  tx: TransactionClient,
  input: RegisterArrivalInput
): Promise<PurchaseArrival> {
  return await tx.purchaseArrival.create({
    data: {
      purchaseId: input.purchaseId,
      arrivedAt: new Date(),
    },
  });
}

async function loadPurchaseDetails(
  tx: TransactionClient,
  arrival: PurchaseArrival
): Promise<ArrivalWithPurchaseDetails> {
  const purchaseDetails = await tx.purchaseDetail.findMany({
    where: { purchaseId: arrival.purchaseId },
  });

  return { ...arrival, purchaseDetails };
}

async function updateOrCreateInventories(
  tx: TransactionClient,
  arrival: ArrivalWithPurchaseDetails
): Promise<void> {
  const arrivalDate = new Date(formatDate(arrival.arrivedAt));

  await Promise.all(
    arrival.purchaseDetails.map((purchaseDetail) => {
      const increases = {
        arrivalId: arrival.id,
        quantity: purchaseDetail.orderQuantity,
      };

      return tx.flowerInventory.upsert({
        where: {
          flowerId_arrivalDate: {
            flowerId: purchaseDetail.flowerId,
            arrivalDate,
          },
        },
        // 在庫がある場合は更新する
        update: {
          currentQuantity: { increment: purchaseDetail.orderQuantity },
          increases: { create: increases },
        },
        // 在庫がなければ作成する
        create: {
          flowerId: purchaseDetail.flowerId,
          arrivalDate,
          currentQuantity: purchaseDetail.orderQuantity,
          increases: { create: increases },
        },
      });
    })
  );
}

export const reigsterArrival = publicProcedure
  .input(RegisterArrivalInput)
  .mutation(async ({ ctx, input }) => {
    await ctx.prisma.$transaction(async (tx) => {
      const arrival = await persistArrival(tx, input);

      const arrivalWithPurchaseDetails = await loadPurchaseDetails(tx, arrival);
      await updateOrCreateInventories(tx, arrivalWithPurchaseDetails);

      return arrival;
    });
  });
