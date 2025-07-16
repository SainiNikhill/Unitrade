import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";
import userModel from "../models/user.model.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { paymentMethod, meetupAddress } = req.body;

    // Validate input
    if (!paymentMethod || !meetupAddress) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    if (paymentMethod !== "cod") {
      return res.status(400).json({
        success: false,
        message: "Only COD orders are supported for now",
      });
    }

    const user = await userModel.findById(userId);
    if (!user || !user.cartData || Object.keys(user.cartData).length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const productIds = Object.keys(user.cartData);

    // Fetch products in cart
    const products = await productModel.find({ _id: { $in: productIds } });

    const orders = [];

    for (const product of products) {
      if (product.isSold) {
        // Skip sold products (optionally, could notify user)
        continue;
      }

      // Mark product as sold
      product.isSold = true;
      await product.save();

      // Create order
      const order = new orderModel({
        buyer: userId,
        seller: product.seller,
        product: product._id,
        paymentMethod,
        isPaid: false,
        meetupAddress,
      });

      await order.save();
      orders.push(order);

      // Remove product from user's cart
      delete user.cartData[product._id];
    }

    user.markModified("cartData");
    await user.save();

    if (orders.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No available products to order (all sold or cart empty)",
      });
    }

    res.status(201).json({
      success: true,
      message: "Order placed for all available products in cart",
      orders,
    });
  } catch (error) {
    console.error("Order placement error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await orderModel
      .find({ buyer: userId })
      .populate("product") // brings in product info
      .populate("seller", "name email") // optional: seller info
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

