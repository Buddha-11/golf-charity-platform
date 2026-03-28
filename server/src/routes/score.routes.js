import express from "express";
import { addScore, getScores } from "../controllers/score.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, addScore);
router.get("/", protect, getScores);

export default router;