import { configureStore } from "@reduxjs/toolkit";
import { loginAdminSlice } from "./slice/login-admin-slice";

export const store = configureStore({
  reducer: {
    loginAdmin: loginAdminSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
