import dotenv from "dotenv";
import { pool } from "../config/db.js";

dotenv.config();

/* =====================================================
   JEWELLERY PRODUCTS
===================================================== */

const jewelleryProducts = [
  {
    name: "Pearl Drop Earrings",
    price: 899,
    rating: 4.7,
    category: "Earrings",
    collectionType: "jewellery",
    color: "Pearl",
    sizes: ["Free Size"],
    skinTones: [],
    image: "/images/products/jewellery/pearl-drop-earrings.jpg",
  },

  {
    name: "Gold Layered Necklace",
    price: 1299,
    rating: 4.8,
    category: "Necklaces",
    collectionType: "jewellery",
    color: "Gold",
    sizes: ["Free Size"],
    skinTones: [],
    image: "/images/products/jewellery/gold-layered-necklace.jpg",
  },

  {
    name: "Minimal Gold Hoops",
    price: 699,
    rating: 4.6,
    category: "Earrings",
    collectionType: "jewellery",
    color: "Gold",
    sizes: ["Free Size"],
    skinTones: [],
    image: "/images/products/jewellery/minimal-gold-hoops.jpg",
  },

  {
    name: "Pearl Choker",
    price: 1199,
    rating: 4.7,
    category: "Necklaces",
    collectionType: "jewellery",
    color: "Pearl",
    sizes: ["Free Size"],
    skinTones: [],
    image: "/images/products/jewellery/pearl-choker.jpg",
  },

  {
    name: "Statement Gold Bangles",
    price: 999,
    rating: 4.5,
    category: "Bangles",
    collectionType: "jewellery",
    color: "Gold",
    sizes: ["Free Size"],
    skinTones: [],
    image: "/images/products/jewellery/gold-bangles.jpg",
  },

  {
    name: "Silver Charm Bracelet",
    price: 799,
    rating: 4.6,
    category: "Bracelets",
    collectionType: "jewellery",
    color: "Silver",
    sizes: ["Free Size"],
    skinTones: [],
    image: "/images/products/jewellery/silver-bracelet.jpg",
  },

  {
    name: "Pearl Bracelet",
    price: 849,
    rating: 4.5,
    category: "Bracelets",
    collectionType: "jewellery",
    color: "Pearl",
    sizes: ["Free Size"],
    skinTones: [],
    image: "/images/products/jewellery/pearl-bracelet.jpg",
  },

  {
    name: "Classic Gold Jhumka",
    price: 1099,
    rating: 4.8,
    category: "Earrings",
    collectionType: "jewellery",
    color: "Gold",
    sizes: ["Free Size"],
    skinTones: [],
    image: "/images/products/jewellery/gold-jhumka.jpg",
  },

  {
    name: "Silver Statement Earrings",
    price: 899,
    rating: 4.6,
    category: "Earrings",
    collectionType: "jewellery",
    color: "Silver",
    sizes: ["Free Size"],
    skinTones: [],
    image: "/images/products/jewellery/silver-statement-earrings.jpg",
  },

  {
    name: "Layered Pearl Necklace",
    price: 1499,
    rating: 4.9,
    category: "Necklaces",
    collectionType: "jewellery",
    color: "Pearl",
    sizes: ["Free Size"],
    skinTones: [],
    image: "/images/products/jewellery/layered-pearl-necklace.jpg",
  },

  {
    name: "Gold Cuff Bracelet",
    price: 1199,
    rating: 4.7,
    category: "Bracelets",
    collectionType: "jewellery",
    color: "Gold",
    sizes: ["Free Size"],
    skinTones: [],
    image: "/images/products/jewellery/gold-cuff-bracelet.jpg",
  },

  {
    name: "Elegant Silver Bangle",
    price: 799,
    rating: 4.5,
    category: "Bangles",
    collectionType: "jewellery",
    color: "Silver",
    sizes: ["Free Size"],
    skinTones: [],
    image: "/images/products/jewellery/silver-bangle.jpg",
  },
];

/* =====================================================
   SEED FUNCTION
===================================================== */

const seedJewellery = async () => {
  try {
    // Remove existing jewellery products
    await pool.query(`
      DELETE FROM products
      WHERE collection_type = 'jewellery'
    `);

    // Insert jewellery products
    for (const product of jewelleryProducts) {
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
      `${jewelleryProducts.length} jewellery products inserted successfully ✅`
    );

    await pool.end();

    process.exit(0);
  } catch (error) {
    console.error(
      "Jewellery seed failed:",
      error
    );

    await pool.end();

    process.exit(1);
  }
};

seedJewellery();
