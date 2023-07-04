import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getDoc,
  doc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { app, db } from "../firebase";
import { USER_TYPES } from "../constants/user";

const auth = getAuth(app);

export const login = createAsyncThunk("login", async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  const docSnap = await getDoc(doc(db, "users", user.uid));
  if (!docSnap.exists()) {
    throw Error("User not found!");
  }
  return { ...docSnap.data(), id: user.uid, email: user.email };
});

export const logout = createAsyncThunk("logout", async () => {
  await signOut(auth);
});

export const register = createAsyncThunk(
  "register",
  async (userData, { rejectWithValue }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      delete userData.password;
      delete userData.otp;
      const newUserData = {
        ...userData,
        walletAmount: 0,
        userType: userData.userType === "Seller" ? 1 : 0,
        billingsId: [],
        defaultBillingId: "",
        addressLine: "",
        city: "",
        postalCode: "",
        country: "",
        createdAt: Timestamp.fromDate(new Date()),
      };
      await setDoc(doc(db, "users", user.uid), newUserData);
      return { id: user.uid, ...newUserData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
