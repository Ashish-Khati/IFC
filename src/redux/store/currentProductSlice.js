import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  price: "",
  sellerId: "",
};

const currentProductSlice = createSlice({
  name: "currentProduct",
  initialState,
  reducers: {
    setCurrentProduct: (state, { payload: product }) => {
      state.name = product.name;
      state.price = product.price;
      state.sellerId = product.sellerId;
    },
  },
});

export const { setCurrentProduct } = currentProductSlice.actions;

export default currentProductSlice.reducer;
