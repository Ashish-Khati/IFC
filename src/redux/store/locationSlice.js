import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLocation: {
    fuelsPrice: { diesel: "", petrol: "" },
  },
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
  },
});

export const { setUserLocation } = locationSlice.actions;
export default locationSlice.reducer;
