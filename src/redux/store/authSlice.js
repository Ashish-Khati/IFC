import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "../../api/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: false,
  },
  reducers: {
    clearAuthError: (state) => {
      state.error = false;
    },
    updateWalletAmount: (state, { payload: { newAmount } }) => {
      state.user.walletAmount = newAmount;
    },
    setUserType: (state, { payload }) => {
      state.user.userType = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = "User Not Found";
      });
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuthError, updateWalletAmount, setUserType } =
  authSlice.actions;
export default authSlice.reducer;
