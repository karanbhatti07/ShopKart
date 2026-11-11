import Order from "../models/Order_model.js";
import Cart from "../models/Cart_model.js";
import Product from "../models/Product_model.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, shippingAddress, paymentMethod } = req.body;
    console.log(items);

    console.log("STEP 1 - ITEMS:", items);

    for (const item of items) {
      console.log("STEP 2 - PRODUCT ID:", item.product);

      const product = await Product.findById(item.product);

      console.log("STEP 3 - PRODUCT:", product);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      console.log("STEP 4 - STOCK:", product.stock);
      console.log("STEP 5 - QUANTITY:", item.quantity);

      if (item.quantity > product.stock) {
        return res.status(404).json({
          message: "Order Reject",
        });
      }
      const newStock = product.stock - item.quantity;
      product.stock = newStock;
      await product.save();
      console.log("STEP 6 - STOCK UPDATED");
    }
    const totalAmount = items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    console.log("STEP 7 - CREATING ORDER");

    console.log("USER ID:", userId);
    console.log("TOTAL:", totalAmount);
    console.log("SHIPPING:", shippingAddress);
    console.log("PAYMENT METHOD:", paymentMethod);

    const orders = await Order.create({
      user: userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });
    console.log("STEP 8 - ORDER CREATED:", orders);

    const cart = await Cart.findOne({
      user: userId,
    });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.status(201).json({
      message: "Order created",
      orders,
    });
  } catch (error) {
    console.log("========== CREATE ORDER ERROR ==========");
    console.log("MESSAGE:", error.message);
    console.log("NAME:", error.name);
    console.log("ERROR:", error);
    console.log("=======================================");

    res.status(500).json({
      message: "Order not created",
      error: error.message,
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({
      user: userId,
    });
    // console.log("Logged in user:", req.user.id);

    res.status(200).json({
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Orders not found",
    });
  }
};

export const getSingleOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const singleOrder = await Order.findOne({
      _id: req.params.id,
      user: userId,
    });
    if (!singleOrder) {
      return res.status(404).json({
        message: "Not Found",
      });
    }
    res.status(200).json({
      message: "order found",
      singleOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Orders not found",
    });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const cancelOrder = await Order.findOne({
      _id: req.params.id,
      user: userId,
    });
    if (!cancelOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    if (cancelOrder.orderStatus !== "Pending") {
      return res.status(400).json({
        message: "Order cannot be cancelled",
      });
    }
    cancelOrder.orderStatus = "Cancelled";

    await cancelOrder.save();
    res.status(200).json({
      message: "Order Cancelled",
      cancelOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Order not cancelled",
    });
  }
};

export const deleteOrder = async(req,res)=>{
  try{

  }
  catch(error){
    console.log(error);
    
  }
}

// For Admin Dashboard

export const getAllOrders = async (req, res) => {
  try {
    const AllOrders = await Order.find({});
    console.log("ALL ORDERS FROM DB:", AllOrders);
    res.status(200).json({
      message: "All Orders",
      AllOrders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const updateOrder = await Order.findById(req.params.id);
    if (!updateOrder) {
      return res.status(404).json({
        message: " Order Not Found",
      });
    }

    console.log("Old Status:", updateOrder.orderStatus);
    console.log("New Status:", req.body.orderStatus);
    updateOrder.orderStatus = req.body.orderStatus;

    await updateOrder.save();
    console.log("Saved Status:", updateOrder.orderStatus);
    res.status(200).json({
      message: "Status Updated",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminSingleOrder = async (req, res) => {
  try {
    const singleOrder = await Order.findById(req.params.id);

    if (!singleOrder) {
      return res.status(404).json({
        message: "order not found",
      });
    }
    res.status(200).json({
      message: "Order Found",
      singleOrder,
    });
  } catch (error) {
    console.log(error);
  }
};
