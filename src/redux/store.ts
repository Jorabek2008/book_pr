import { configureStore } from "@reduxjs/toolkit";
import { loginAdminSlice } from "./slice/login-admin-slice";
import { getAdsSlice } from "./slice/get-ads-slice";

export const store = configureStore({
  reducer: {
    loginAdmin: loginAdminSlice.reducer,
    getAds: getAdsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
