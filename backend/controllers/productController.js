import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/product.model.js";

// Function to add a product
export const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      campus,
      category,
     
      condition,
    } = req.body;

    const sellerId = req.user.id;

    // Required fields check
    if (!title || !price || !campus || !category || !condition) {
      return res.status(400).json({
        success: false,
        message: "Title, price, campus, category, and condition are required",
      });
    }

    // Check condition validity
    const validConditions = ["new", "used", "refurbished"];
    if (!validConditions.includes(condition)) {
      return res.status(400).json({
        success: false,
        message: "Condition must be one of: new, used, refurbished",
      });
    }

    // Handle images
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // Create and save product
    const newProduct = new productModel({
      title,
      description,
      price,
      images: imageUrl,
      campus,
      category,
    
      condition,
      seller: sellerId,
      isSold:false
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const { campus, search } = req.query;

    const filter = {};

    if (campus) filter.campus = campus;
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const products = await productModel
      .find(filter)
      .populate("seller", "name email campus");

    res.json({ success: true, products });
  
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// View single product by ID
export const viewProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await productModel
      .findById(productId)
      .populate("seller", "name email campus");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error viewing product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a product (only seller can delete)
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id;

    const product = await productModel.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (product.seller.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.error("Error removing product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

  