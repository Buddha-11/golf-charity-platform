import express from "express";
import {
  getCharities,
  selectCharity,
  createCharity
} from "../controllers/charity.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getCharities);
router.post("/select", protect, selectCharity);

// optional admin (protect + admin middleware later)
router.post("/", createCharity);

export default router;