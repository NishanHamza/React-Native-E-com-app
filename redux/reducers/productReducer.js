import { createReducer } from "@reduxjs/toolkit";

export const productReducer = createReducer(
  {
    products: [],
    product: {},
  },
  (builder) => {
    builder
      .addCase("getAllProductsRequest", (state) => {
        state.loading = true;
      })
      .addCase("getAdminProductsRequest", (state) => {
        state.loading = true;
      })
      .addCase("getProductDetailsRequest", (state) => {
        state.loading = true;
      });

    builder
      .addCase("getAllProductsSuccess", (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase("getAdminProductsSuccess", (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.outOfStock = action.payload.outOfStock;
        state.inStock = action.payload.inStock;
      })
      .addCase("getProductDetailsSuccess", (state, action) => {
        state.loading = false;
        state.product = action.payload;
      });

    builder
      .addCase("getAllProductsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("getAdminProductsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("getProductDetailsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
);
