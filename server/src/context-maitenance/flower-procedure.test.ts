import { appRouter } from "../router";
import { prisma } from "../database/prisma";
import { createCallerFactory } from "../trpc/init-trpc";

// https://trpc.io/docs/server/server-side-calls
const createCaller = createCallerFactory(appRouter);
const caller = createCaller({
  prisma,
});

describe("createFlower", () => {
  it("花を登録できること", async () => {
    await caller.createFlower({
      flowerCode: "test",
      name: "test",
      deliveryDays: 3,
      purchaseQuantity: 10,
      maintanableDays: 5,
    });

    expect(await prisma.flower.count()).toBe(1);
  });
});
