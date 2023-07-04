import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./store/cartSlice";
import ordersReducer from "./store/ordersRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import walletReducer from "./store/walletRedux";
import modalSlice from "./store/modalSlice";
import authSlice from "./store/authSlice";
import currentProductSlice from "./store/currentProductSlice";
import locationSlice from "./store/locationSlice";
import chatsSlice from "./store/chatsSlice";
import productSlice from "./store/productSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartReducer,
  modal: modalSlice,
  wallet: walletReducer,
  orders: ordersReducer,
  chats: chatsSlice,
  currentProduct: currentProductSlice,
  location: locationSlice,
  products: productSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
