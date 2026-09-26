import { pool } from "../config/db.js";

// GET ALL PRODUCTS + FILTERS
export const getProducts = async (req, res) => {
  try {
    const {
      collection,
      skinTone,
      category,
      color,
      size,
    } = req.query;

    let query = `
      SELECT
        id,
        id AS "_id",
        name,
        price,
        rating,
        category,
        collection_type AS "collectionType",
        color,
        sizes,
        skin_tones AS "skinTones",
        image,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM products
      WHERE 1=1
    `;

    const values = [];
    let paramIndex = 1;

    // Collection filter
    if (collection) {
      query += ` AND LOWER(collection_type) = LOWER($${paramIndex})`;
      values.push(collection);
      paramIndex++;
    }

    // Skin tone filter
    // Jewellery ke liye skin tone filter apply nahi hoga
    if (
      skinTone &&
      collection?.toLowerCase() !== "jewellery"
    ) {
      query += `
        AND EXISTS (
          SELECT 1
          FROM unnest(skin_tones) AS tone
          WHERE LOWER(tone) = LOWER($${paramIndex})
        )
      `;

      values.push(skinTone);
      paramIndex++;
    }

    // Category filter
    if (category) {
      query += ` AND LOWER(category) = LOWER($${paramIndex})`;
      values.push(category);
      paramIndex++;
    }

    // Color filter
    if (color) {
      query += ` AND LOWER(color) = LOWER($${paramIndex})`;
      values.push(color);
      paramIndex++;
    }

    // Size filter
    if (size) {
      query += `
        AND EXISTS (
          SELECT 1
          FROM unnest(sizes) AS product_size
          WHERE LOWER(product_size) = LOWER($${paramIndex})
        )
      `;

      values.push(size);
      paramIndex++;
    }

    // Same behavior as MongoDB:
    // newest products first
    query += ` ORDER BY created_at DESC`;

    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      products: result.rows,
    });
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};


// GET SINGLE PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        id,
        id AS "_id",
        name,
        price,
        rating,
        category,
        collection_type AS "collectionType",
        color,
        sizes,
        skin_tones AS "skinTones",
        image,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM products
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Get product by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};