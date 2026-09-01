import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    collectionType: {
      type: String,
      required: true,
      enum: [
        "trendy",
        "traditional",
        "jewellery",
      ],
    },

    color: {
      type: String,
      required: true,
      trim: true,
    },

    sizes: {
      type: [String],
      default: [],
    },

    skinTones: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model(
  "Product",
  productSchema
);

export default Product;