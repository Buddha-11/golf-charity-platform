import express from "express";
import {
  runDraw,
  getLatestDraw,
  getWinners
} from "../controllers/draw.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/auth.middleware.js";
import { getUserWinnings } from "../controllers/draw.controller.js";
const router = express.Router();

router.get("/latest", getLatestDraw);
router.get("/winners", getWinners);
router.post("/run", protect, adminOnly, runDraw);
router.get("/my", protect, getUserWinnings);
export default router;