import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getAccountDetails,
  updateAccountDetails,
} from "../controllers/accountController.js";

const router = express.Router();


// GET logged-in user's account details
router.get("/", authMiddleware, getAccountDetails);


// UPDATE logged-in user's account details
router.put("/", authMiddleware, updateAccountDetails);


export default router;