import userModel from '../models/user.model.js'
import productModel from  '../models/product.model.js'

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const user = await userModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // Check if product already in cart
    if (user.cartData[productId]) {
      return res
        .status(400)
        .json({ success: false, message: "Product already in cart" });
    }

    // Check if product exists and is not sold
    const product = await productModel.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    if (product.isSold) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot add sold product to cart" });
    }

    // Add to cart
    user.cartData[productId] = true;
    user.markModified("cartData");
    await user.save();

    res.json({ success: true, message: "Product added to cart" });
  } catch (err) {
    console.error("Add to cart error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
  
// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId } = req.body;
  
      const user = await userModel.findById(userId);
      if (!user) return res.status(404).json({ success: false, message: "User not found" });
  
      delete user.cartData[productId];

      user.markModified('cartData')
      await user.save();
  
      res.json({ success: true, message: "Product removed from cart" });
    } catch (err) {
      console.error("Remove from cart error:", err.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  export const getCartItems = async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await userModel.findById(userId);
      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });

      const productIds = Object.keys(user.cartData);

      const products = await productModel
        .find({ _id: { $in: productIds }})
        .populate("seller", "name email campus");

      res.json({ success: true, cart: products });
    } catch (err) {
      console.error("Get cart items error:", err.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  