import { createSlice } from "@reduxjs/toolkit";
import { getTransactions } from "../../api/wallet";

const initialState = {
  walletBalance: 0,
  totalDiscount: 0,
  amountSpent: 0,
  transactions: { wallet: [], bank: [] },
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletBalance(state, action) {
      state.walletBalance = action.payload;
    },
    setAmountSaved(state, action) {
      state.amountSaved = action.payload;
    },
    setAmountSpent(state, action) {
      state.amountSpent = action.payload;
    },
    addTransaction(state, action) {
      state.transactions.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTransactions.fulfilled, (state, { payload }) => {
      const transactions = payload;
      let totalDiscount = 0,
        totalSpend = 0;
      const walletTransactions = [],
        bankTransactions = [];
      transactions.map(({ discount, amount }) => {
        totalDiscount += discount;
        totalSpend += amount;
      });
      transactions.map((trans) => {
        if (trans.wallletTransferAmount > 0) {
          walletTransactions.push(trans);
        } else {
          bankTransactions.push(trans);
        }
      });
      state.totalDiscount = totalDiscount;
      state.amountSpent = totalSpend;
      state.transactions = {
        wallet: walletTransactions,
        bank: bankTransactions,
      };
    });
  },
});

export const {
  setWalletBalance,
  setAmountSaved,
  setAmountSpent,
  addTransaction,
} = walletSlice.actions;

export default walletSlice.reducer;
