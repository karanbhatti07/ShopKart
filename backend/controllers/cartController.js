import Cart from "../models/Cart_model.js";
import Product from "../models/Product_model.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    const cart = await Cart.findOne({
      user: userId,
    });
    if (!cart) {
      const newCart = await Cart.create({
        user: userId,
        items: [
          {
            product: productId,
            quantity: 1,
            price: product.price,
          },
        ],
      });
      return res.status(200).json({
        message: "Product added to cart",
        cart: newCart,
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId,
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.items.push({
          product: productId,
          quantity: 1,
          price: product.price,
        });
      }
    }
    await cart.save();
    return res.status(200).json({
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    return res.status(200).json({
      cart,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({
      user: userId,
    });
    cart.items = cart.items.filter((item) => {
      return item.product.toString() !== req.params.productId;
    });
    await cart.save();
    res.status(200).json({
      message: "Product removed from cart",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const userCart = await Cart.findOne({
      user: userId,
    });
    if (!userCart) {
      return res.status(404).json({
        message: "User Cart not found",
      });
    }
    const existingItem = userCart.items.find(
      (item) => item.product.toString() === productId,
    );
    if (!existingItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    existingItem.quantity = quantity;

    await userCart.save();
    res.status(200).json({
      message: "Successfully updated",
    });
  } catch (error) {
    console.log(error);
  }
};
