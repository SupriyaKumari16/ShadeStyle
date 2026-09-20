import express from "express";

import {
  signup,
  login,
} from "../controllers/authController.js";

const router = express.Router();

/* =========================
   SIGNUP
   POST /api/auth/signup
========================= */

router.post(
  "/signup",
  signup
);
/* =========================
   LOGIN
   POST /api/auth/login
========================= */

router.post(
  "/login",
  login
);

export default router;