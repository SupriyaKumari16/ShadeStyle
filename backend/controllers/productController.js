import Product from "../models/Product.js";


/* =====================================================
   GET ALL PRODUCTS
===================================================== */

export const getProducts = async (req, res) => {
  try {
    const {
      collection,
      skinTone,
      category,
      color,
      size,
    } = req.query;

    const filter = {};


    /* =========================
       COLLECTION FILTER
    ========================= */

    if (collection) {
      filter.collectionType =
        collection.toLowerCase();
    }


    /* =========================
       SKIN TONE FILTER
    ========================= */

    if (
      skinTone &&
      collection?.toLowerCase() !== "jewellery"
    ) {
      filter.skinTones = {
        $in: [
          new RegExp(
            `^${skinTone}$`,
            "i"
          ),
        ],
      };
    }


    /* =========================
       CATEGORY FILTER
    ========================= */

    if (category) {
      filter.category = category;
    }


    /* =========================
       COLOR FILTER
    ========================= */

    if (color) {
      filter.color = color;
    }


    /* =========================
       SIZE FILTER
    ========================= */

    if (size) {
      filter.sizes = size;
    }


    /* =========================
       FETCH PRODUCTS
    ========================= */

    const products = await Product.find(
      filter
    ).sort({
      createdAt: -1,
    });


    /* =========================
       RESPONSE
    ========================= */

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {

    console.error(
      "Get products error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};


/* =====================================================
   GET SINGLE PRODUCT BY ID
===================================================== */

export const getProductById = async (req, res) => {
  try {

    const { id } = req.params;


    /* =========================
       FIND PRODUCT
    ========================= */

    const product =
      await Product.findById(id);


    /* =========================
       PRODUCT NOT FOUND
    ========================= */

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    }


    /* =========================
       RESPONSE
    ========================= */

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {

    console.error(
      "Get product by ID error:",
      error
    );


    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });

  }
};