import { Router } from "express";
import { gamesRouter } from "./games.routes";
import { adsRouter } from "./ads.routes";

const router = Router();

router.use("/games", gamesRouter);
router.use("/ads", adsRouter);

export { router };
