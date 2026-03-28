import express from "express";
import {
  getCharities,
  selectCharity,
  createCharity
} from "../controllers/charity.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { deleteCharity } from "../controllers/charity.controller.js";
const router = express.Router();
import { adminOnly } from "../middlewares/auth.middleware.js";


router.get("/", getCharities);
router.post("/select", protect, selectCharity);

// optional admin (protect + admin middleware later)
router.post("/", protect, adminOnly, createCharity);
router.delete("/:id", protect, adminOnly, deleteCharity);
export default router;