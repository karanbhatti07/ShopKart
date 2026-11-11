import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Order from "../models/Order_model.js";
import Product from "../models/Product_model.js";
import Cart from "../models/Cart_model.js";

export const createRazorpayOrder = async (req, res) => {
  try {
    const { items } = req.body;

    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      if (item.quantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock`,
        });
      }

      totalAmount += product.price * item.quantity;
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
      totalAmount,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Razorpay order creation failed",
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);

    let totalAmount = 0;

    for (const item of orderData.items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      totalAmount += product.price * item.quantity;
    }

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    if (razorpayOrder.amount !== totalAmount * 100) {
      return res.status(400).json({
        success: false,
        message: "Payment amount mismatch",
      });
    }
    for (const item of orderData.items) {
      const product = await Product.findById(item.product);

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock`,
        });
      }

      product.stock = product.stock - item.quantity;

      await product.save();
    }
    const orders = await Order.create({
      user: req.user.id,
      items: orderData.items,
      totalAmount: totalAmount,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: "Razorpay",
      paymentStatus: "Paid",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    });
    const cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Payment verified and order created successfully",
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Payment verification error",
    });
  }
};
