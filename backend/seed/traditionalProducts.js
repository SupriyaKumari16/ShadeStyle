import dotenv from "dotenv";
import { pool } from "../config/db.js";

import {
  traditionalProducts,
} from "../../frontend/src/data/traditional/data.js";

dotenv.config();

const seedTraditionalProducts = async () => {
  try {
    // Existing traditional products remove
    await pool.query(`
      DELETE FROM products
      WHERE collection_type = 'traditional'
    `);

    // Add collectionType
    const products = traditionalProducts.map(
      ({ id, ...product }) => ({
        ...product,
        collectionType: "traditional",
      })
    );

    // Insert products into PostgreSQL
    for (const product of products) {
      await pool.query(
        `
        INSERT INTO products (
          name,
          price,
          rating,
          category,
          collection_type,
          color,
          sizes,
          skin_tones,
          image
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `,
        [
          product.name,
          product.price,
          product.rating,
          product.category,
          product.collectionType,
          product.color,
          product.sizes,
          product.skinTones,
          product.image,
        ]
      );
    }

    console.log(
      `${products.length} traditional products inserted successfully ✅`
    );

    await pool.end();

    process.exit(0);
  } catch (error) {
    console.error(
      "Traditional products seeding failed:",
      error
    );

    await pool.end();

    process.exit(1);
  }
};

seedTraditionalProducts();