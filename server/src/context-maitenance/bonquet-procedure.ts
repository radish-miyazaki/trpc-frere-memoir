import { publicProcedure } from "../trpc/init-trpc";
import { CreateBonquetInput } from "./api-schema";

export const createBonquet = publicProcedure
  .input(CreateBonquetInput)
  .mutation(async ({ ctx, input }) => {
    const bonquet = await ctx.prisma.bonquet.create({
      data: {
        bonquetCode: input.bonquetCode,
        name: input.name,
        bonquetDetails: {
          createMany: {
            data: input.bonquetDetails,
          },
        },
      },
    });

    return bonquet;
  });
