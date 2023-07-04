import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { where, getDocs, collection, query } from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
  productsByAdmin: [],
};

export const fetchProductsByAdmin = createAsyncThunk(
  "products/fetchProductsByAdmin",
  async () => {
    const q = query(collection(db, "products"), where("byAdmin", "==", true));
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      if (doc.id) products.push({ ...doc.data(), id: doc.id });
    });
    return products;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByAdmin.pending, (state) => {})
      .addCase(fetchProductsByAdmin.fulfilled, (state, action) => {
        state.productsByAdmin = action.payload;
      })
      .addCase(fetchProductsByAdmin.rejected, (state) => {});
  },
});

export const {} = productsSlice.actions;
export default productsSlice.reducer;
