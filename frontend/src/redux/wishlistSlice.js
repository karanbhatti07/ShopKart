import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.items.find((item) => {
        return item.product._id === action.payload._id;
      });
      if (existingItem) {

      } else {
        state.items.push({
          product: action.payload,
          quantity: 1,
          price: action.payload.price,
        });
      }
    },
    
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => {
        return item.product._id !== action.payload;
      });
    },
    setwishlist: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToWishlist,
 
  removeItem,
  setwishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
