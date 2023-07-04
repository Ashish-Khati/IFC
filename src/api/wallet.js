import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, collection, query, where, or } from "firebase/firestore";
import { db } from "../firebase";

export const getTransactions = createAsyncThunk(
  "wallet/fetchTransactions",
  async (arg, { getState }) => {
    const { userType, id } = getState().auth.user;
    const transactions = [];
    const q = query(
      collection(db, "transactions"),
      where(userType === 0 ? "buyerId" : "sellerId", "==", id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.exists()) transactions.push({ id: doc.id, ...doc.data() });
    });
    return transactions;
  }
);
