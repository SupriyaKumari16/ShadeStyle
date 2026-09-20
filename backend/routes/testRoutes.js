import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/protected",
  authMiddleware,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "You are authenticated",
      user: req.user,
    });
  }
);

export default router;