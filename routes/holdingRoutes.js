import { Router } from "express";
import { getHoldings, addHolding, updateHolding, deleteHolding } from "../controllers/holdingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Get all holdings
router.get("/", protect, getHoldings);

// Create Add holding
router.post("/", protect, addHolding);

// Update holding
router.put("/:id", protect, updateHolding);

// Delete holding
router.delete("/:id", protect, deleteHolding);

export default router;
