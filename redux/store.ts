import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/ProductSlice"; 

export const store = configureStore({
  reducer: {
    products: productReducer, 
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
