import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/ProductSlice"; 
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer, 
    cart: cartReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
