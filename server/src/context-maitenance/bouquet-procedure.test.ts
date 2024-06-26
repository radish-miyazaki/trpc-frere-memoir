import { appRouter } from "../router";
import { prisma } from "../database/prisma";
import { createCallerFactory } from "../trpc/init-trpc";

const createCaller = createCallerFactory(appRouter);
const caller = createCaller({ prisma });

describe("createBouquet", () => {
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

    const bouquet = await caller.createBouquet({
      name: "ローズの花束",
      bouquetCode: "BA001",
      bouquetDetails: [{ flowerId: flower.id, flowerQuantity: 5 }],
    });

    expect(
      await Promise.all([
        prisma.bouquet.count(),
        prisma.bouquetDetail.count({ where: { bouquetId: bouquet.id } }),
      ])
    ).toStrictEqual([1, 1]);
  });
});
