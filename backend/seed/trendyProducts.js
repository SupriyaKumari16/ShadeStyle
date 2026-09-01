import dotenv from "dotenv";
import mongoose from "mongoose";

import Product from "../models/Product.js";
import connectDB from "../config/db.js";

import { trendyProducts } from "../../frontend/src/data/trendy/data.js";

dotenv.config();

const seedTrendyProducts = async () => {
  try {
    await connectDB();

    // Existing trendy products remove
    await Product.deleteMany({
      collectionType: "trendy",
    });

    // Add collectionType to frontend data
    const products = trendyProducts.map(
      ({ id, ...product }) => ({
        ...product,
        collectionType: "trendy",
      })
    );

    await Product.insertMany(products);

    console.log(
      `${products.length} trendy products inserted successfully ✅`
    );

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error(
      "Trendy products seeding failed:",
      error
    );

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedTrendyProducts();