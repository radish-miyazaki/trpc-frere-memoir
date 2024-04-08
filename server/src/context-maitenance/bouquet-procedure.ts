import { publicProcedure } from "../trpc/init-trpc";
import { CreateBouquetInput } from "./api-schema";

export const createBouquet = publicProcedure
  .input(CreateBouquetInput)
  .mutation(async ({ ctx, input }) => {
    const bouquet = await ctx.prisma.bouquet.create({
      data: {
        bouquetCode: input.bouquetCode,
        name: input.name,
        bouquetDetails: {
          createMany: {
            data: input.bouquetDetails,
          },
        },
      },
    });

    return bouquet;
  });
