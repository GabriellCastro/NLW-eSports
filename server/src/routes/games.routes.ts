import { Router } from "express";
import { prisma } from "../database/client";

import { convertHourStringToMinutes } from "../utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "../utils/convert-minutes-to-hour-string";

const gamesRouter = Router();

gamesRouter.get("/", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return response.status(200).json(games);
});

gamesRouter.get("/:id/ads", async (request, response) => {
  const { id } = request.params;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response.status(200).json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    })
  );
});

gamesRouter.post("/:id/ads", async (request, response) => {
  const { id } = request.params;
  const {
    name,
    weekDays,
    useVoiceChannel,
    yearsPlaying,
    hourStart,
    hourEnd,
    discord,
  } = request.body;

  const ad = await prisma.ad.create({
    data: {
      name,
      gameId: id,
      weekDays: weekDays.join(","),
      useVoiceChannel,
      yearsPlaying,
      hourStart: convertHourStringToMinutes(hourStart),
      hourEnd: convertHourStringToMinutes(hourEnd),
      discord,
    },
  });

  return response.status(201).json(ad);
});

export { gamesRouter };
