import express from "express";
import { searchFAQsHandler } from "../controllers/bot.controller";

const router = express.Router();

// Route to search FAQs
router.get("/search", searchFAQsHandler);

export default router;
