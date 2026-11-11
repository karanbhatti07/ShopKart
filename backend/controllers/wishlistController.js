import Wishlist from "../models/Wishlist_model.js";

export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    const wishlistItem = await Wishlist.findOne({ user: userId });
    let exist = false;

    if (wishlistItem) {
      exist = wishlistItem.items.some(
        (item) => item.product.toString() === productId,
      );
      if (exist) {
        return res.status(400).json({
          message: "Already Exist",
        });
      }
      if (!exist) {
        wishlistItem.items.push({ product: productId });
        await wishlistItem.save();
      }
    }
    if (!wishlistItem) {
      const newWishlistItem = await Wishlist.create({
        user: userId,
        items: [
          {
            product: productId,
          },
        ],
      });
    }
    res.status(200).json({
      message: "Item added to wishlist",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    const wishlistItem = await Wishlist.findOne({ user: userId });
    if (!wishlistItem) {
      return res.status(400).json({
        message: "Product not found",
      });
    } else {
      wishlistItem.items = wishlistItem.items.filter(
        (item) => item.product.toString() !== productId,
      );

      await wishlistItem.save();
    }
    res.status(200).json({
      message: "Item removed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlistItem = await Wishlist.findOne({ user: userId }).populate(
      "items.product",
    );
    if (!wishlistItem) {
      return res.status(404).json({
        message: "Item Not Found",
      });
    }
    res.status(200).json({
      message: "Item Found",
      wishlistItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
