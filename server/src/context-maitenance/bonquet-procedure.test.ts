import { appRouter } from "../router";
import { prisma } from "../database/prisma";
import { createCallerFactory } from "../trpc/init-trpc";

const createCaller = createCallerFactory(appRouter);
const caller = createCaller({ prisma });

describe("createBonquet", () => {
  it("花束を登録できること", async () => {
    const flower = await prisma.flower.create({
      data: {
        name: "ローズ",
        flowerCode: "RO001",
        maintanableDays: 5,
        deliveryDays: 3,
        purchaseQuantity: 10,
      },
    });

    const bonquet = await caller.createBonquet({
      name: "ローズの花束",
      bonquetCode: "BA001",
      bonquetDetails: [{ flowerId: flower.id, flowerQuantity: 5 }],
    });

    expect(
      await Promise.all([
        prisma.bonquet.count(),
        prisma.bonquetDetail.count({ where: { bonquetId: bonquet.id } }),
      ])
    ).toStrictEqual([1, 1]);
  });
});
