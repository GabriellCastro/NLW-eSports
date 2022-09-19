import { Router } from "express";
import { prisma } from "../database/client";

const adsRouter = Router();

adsRouter.get("/:id/discord", async (request, response) => {
  const { id } = request.params;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id,
    },
  });

  return response.status(200).json({
    discord: ad.discord,
  });
});

export { adsRouter };
