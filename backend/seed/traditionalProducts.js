import dotenv from "dotenv";
import mongoose from "mongoose";

import Product from "../models/Product.js";
import connectDB from "../config/db.js";

import {
  traditionalProducts,
} from "../../frontend/src/data/traditional/data.js";

dotenv.config();

const seedTraditionalProducts = async () => {
  try {
    await connectDB();

    // Existing traditional products remove
    await Product.deleteMany({
      collectionType: "traditional",
    });

    // Add collectionType
    const products = traditionalProducts.map(
      ({ id, ...product }) => ({
        ...product,
        collectionType: "traditional",
      })
    );

    await Product.insertMany(products);

    console.log(
      `${products.length} traditional products inserted successfully ✅`
    );

    await mongoose.connection.close();

    process.exit(0);

  } catch (error) {

    console.error(
      "Traditional products seeding failed:",
      error
    );

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedTraditionalProducts();