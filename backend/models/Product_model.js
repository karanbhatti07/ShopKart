import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    segment: {
      type: String,
      enum: ["Men", "Women", "Kids", "Electronics", "Footwear", "Beauty", "Accessories"],
    },
    audience: {
      type: String,
      enum: ["Men", "Women", "Kids"],
    },
    image: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    brand: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
