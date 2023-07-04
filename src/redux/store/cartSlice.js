import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    {
      name: "Product title 1",
      prize: 36.56,
      starRating: 4,
    },
  ],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
