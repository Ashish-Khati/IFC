import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { USER_TYPES } from "../../constants/user";
import { getDocs, where, collection, query } from "firebase/firestore";
import { db } from "../../firebase";
import { getUser } from "../api";

export const fetchUserChats = createAsyncThunk(
  "chats/fetchUserChats",
  async (arg, { getState }) => {
    const user = getState().auth.user;
    const { userType, id } = user;
    const q = query(
      collection(db, "chats"),
      where(userType === 0 ? "buyerId" : "sellerId", "==", id)
    );
    const querySnapshot = await getDocs(q);
    const tempChats = [];
    querySnapshot.forEach(async (doc) => {
      if (doc.id) {
        tempChats.push({ ...doc.data(), id: doc.id });
      }
    });

    const chatsPromise = tempChats.map(
      async ({ buyerId, sellerId, ...rest }) => {
        return Promise.all([
          getUser(userType === 0 ? sellerId : buyerId),
          user,
        ]).then((data) => {
          [
            userType === 0 ? "seller" : "buyer",
            USER_TYPES[userType !== 0 ? 1 : 0],
          ].map((key, i) => {
            rest[key] = data[i];
          });
          return rest;
        });
      }
    );

    const chats = await Promise.all(chatsPromise);
    return chats;
  }
);

const chatsSlice = createSlice({
  name: "chats",
  initialState: { chats: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserChats.fulfilled, (state, action) => {
      state.chats = action.payload;
    });
  },
});

export const {} = chatsSlice.actions;

export default chatsSlice.reducer;
