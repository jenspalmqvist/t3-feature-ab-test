import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    // simulate a slow db call

    return ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: { featureFlags: true },
    });
  }),
});
