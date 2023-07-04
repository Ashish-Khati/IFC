import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { USER_TYPES } from "../../constants/user";
import { getDocs, where, collection, query, or } from "firebase/firestore";
import { db } from "../../firebase";
import { getProduct, getUser, getAddress } from "../api";

export const getUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (arg, { getState }) => {
    const { userType, id } = getState().auth.user;
    const q = query(
      collection(db, "orders"),
      or(where("sellerId", "==", id), where("buyerId", "==", id))
    );
    const querySnapshot = await getDocs(q);
    const tempOrder = [];
    querySnapshot.forEach(async (doc) => {
      if (doc.id) {
        tempOrder.push({ ...doc.data(), id: doc.id });
      }
    });

    const ordersPromise = tempOrder.map(
      async ({ productId, sellerId, ...rest }) => {
        return Promise.all([getProduct(productId), getUser(sellerId)]).then(
          (data) => {
            ["product", "seller"].map((key, i) => {
              rest[key] = data[i];
            });
            return rest;
          }
        );
      }
    );

    const orders = await Promise.all(ordersPromise);
    console.log(orders);
    return orders;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: { orders: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

export const {} = ordersSlice.actions;

export default ordersSlice.reducer;
