import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";

const router = express.Router();


// GET all addresses of logged-in user
router.get("/", authMiddleware, getAddresses);


// ADD new address
router.post("/", authMiddleware, createAddress);


// UPDATE address
router.put("/:id", authMiddleware, updateAddress);


// DELETE address
router.delete("/:id", authMiddleware, deleteAddress);


export default router;