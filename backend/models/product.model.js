import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: [{ type: String }],
  campus: { type: String, required: true },
  category: {
    type: String,
    required: true,
  },

  condition: {
    type: String,
    required: true,
    enum: ["new", "used", "refurbished"],
  },
  isSold: {
    type: Boolean,
    default: false,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});


const productModel = mongoose.model('product', productSchema)
export default productModel;