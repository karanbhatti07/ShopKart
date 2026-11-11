import mongoose from "mongoose"
const wishlistSchems = new mongoose.Schema(
  {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      items: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
        },
      ],
    },
    {
      timestamps: true,
    },

)
const Wishlist = mongoose.model("Wishlist", wishlistSchems)
export default Wishlist