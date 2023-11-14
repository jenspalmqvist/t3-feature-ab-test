import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user) {
      return undefined;
    }
    return ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: { featureFlags: true },
    });
  }),
});
