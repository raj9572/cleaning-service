// models/Product.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    images: [String],
    videos: [String],
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,

    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },

    images: [String],
    price: {
      type: String,
      required: true,
    },
    discountPrice: String,

    quantity: { type: Number, default: 1 },
    inStock: { type: Boolean, default: true },

    onSale: { type: Boolean, default: false },

    rating: { type: Number, default: 0 },

    reviews: [reviewSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
