import { publicProcedure } from "../trpc/init-trpc";
import { notFoundError } from "../utils/trpc";
import { CreateFlowerInput, FlowerIdInput } from "./api-schema";

export const createFlower = publicProcedure
  .input(CreateFlowerInput)
  .mutation(async ({ ctx, input }) => {
    const flower = await ctx.prisma.flower.create({
      data: input,
    });

    return flower;
  });

export const getFlowers = publicProcedure.query(({ ctx }) => {
  return ctx.prisma.flower.findMany();
});

export const getFlower = publicProcedure
  .input(FlowerIdInput)
  .query(async ({ ctx, input }) => {
    const flower = await ctx.prisma.flower.findUnique({
      where: { id: input.flowerId },
    });

    if (!flower) throw notFoundError;

    return flower;
  });
