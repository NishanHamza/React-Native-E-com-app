import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer(
  {
    cartItems: [],
  },
  (builder) => {
    builder
      .addCase("addToCart", (state, action) => {
        const item = action.payload;
        const isExist = state.cartItems.find((i) => i.product === item.product);
        if (isExist) {
          state.cartItems[state.cartItems.indexOf(isExist)] = item;
        } else state.cartItems.push(item);
      })
      .addCase("removeFromCart", (state, action) => {
        state.cartItems = state.cartItems.filter(
          (i) => i.product !== action.payload
        );
      })
      .addCase("clearCart", (state) => {
        state.cartItems = [];
      });
  }
);
