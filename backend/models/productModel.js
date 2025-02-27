import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String], // Ensures it only stores an array of strings
    default: []
  },
  bestseller: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Number,
  },
});

const productModel =
  mongoose.models.product || mongoose.model("products", productSchema);
export default productModel;
