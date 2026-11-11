import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => {
        return item.product._id === action.payload._id;
      });
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({
          product: action.payload,
          quantity: 1,
          price: action.payload.price,
        });
      }
    },
    increasequantity: (state, action) => {
      const increase = state.items.find((item) => {
        return item.product._id === action.payload;
      });
      if (increase) {
        increase.quantity++;
      }
    },
    decreasequantity: (state, action) => {
      const decrease = state.items.find((item) => {
        return item.product._id === action.payload;
      });
      if (decrease && decrease.quantity > 1) {
        decrease.quantity--;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => {
        return item.product._id !== action.payload;
      });
    },
    setCart: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToCart,
  increasequantity,
  decreasequantity,
  removeItem,
  setCart,
} = cartSlice.actions;
export default cartSlice.reducer;
