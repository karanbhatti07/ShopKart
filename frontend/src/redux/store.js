import { configureStore } from "@reduxjs/toolkit";
import reducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

const store = configureStore({
  reducer: {
    cart: reducer,
    wishlist: wishlistReducer
  }
});

export default store;