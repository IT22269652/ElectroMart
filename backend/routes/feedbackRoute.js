import express from "express";
import {
  addFeedback,
  getFeedbacks,
  getFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/add", addFeedback);
router.get("/all", getFeedbacks);
router.get("/:id", getFeedback); // Get single feedback
router.put("/:id", updateFeedback); // Update feedback
router.delete("/:id", deleteFeedback);

export default router;
