import express from "express";
import { shortenUrl, getAnalytics } from "../controllers/urlController";

const router = express.Router();

/**
 * @route   POST /api/shorten
 * @desc    Create a shortened URL
 * @access  Public
 */
router.post("/shorten", shortenUrl);

/**
 * @route   GET /api/analytics/:code
 * @desc    Get analytics for a shortened URL
 * @access  Public
 */
router.get("/analytics/:code", getAnalytics);

export default router;
