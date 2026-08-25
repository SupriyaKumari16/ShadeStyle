import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());


/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ShadeStyle Backend is running 🚀",
  });
});


/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });

  } catch (error) {
    console.error(
      "Server startup failed."
    );

    process.exit(1);
  }
};

startServer();