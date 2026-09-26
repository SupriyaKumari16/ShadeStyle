import dotenv from "dotenv";
import { pool } from "../config/db.js";

import { trendyProducts } from "../../frontend/src/data/trendy/data.js";

dotenv.config();

const seedTrendyProducts = async () => {
  try {
    // Existing trendy products remove
    await pool.query(`
      DELETE FROM products
      WHERE collection_type = 'trendy'
    `);

    // Add collectionType to frontend data
    const products = trendyProducts.map(
      ({ id, ...product }) => ({
        ...product,
        collectionType: "trendy",
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
      `${products.length} trendy products inserted successfully ✅`
    );

    await pool.end();

    process.exit(0);
  } catch (error) {
    console.error(
      "Trendy products seeding failed:",
      error
    );

    await pool.end();

    process.exit(1);
  }
};

seedTrendyProducts();