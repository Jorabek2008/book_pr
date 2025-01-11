import toast from "react-hot-toast";
import { loginAdminService } from "../services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
  isLoggedIn: false,
  succes: false,
  user: null,
  loading: false,
};

interface LoginData {
  email: string;
  password: string;
}

export const loginAdmin = createAsyncThunk(
  "loginAdmin",
  async (data: LoginData, { rejectWithValue }) => {
    try {
      const response = await loginAdminService(data);
      toast.success("Login Success");
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Login Failed";
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
        return rejectWithValue("An unexpected error occurred");
      }
    }
  },
);

export const loginAdminSlice = createSlice({
  name: "loginAdmin",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAdmin.pending, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.loading = true;
    });
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem("userId", action.payload.user.id);
      location.replace("/admin");
      toast.success("Login Success");
      state.loading = false;
    });
    builder.addCase(loginAdmin.rejected, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.loading = false;
    });
  },
});

// export const logoutAdmin = createAsyncThunk("logoutAdmin", async () => {
//   try {
//     const response = await logoutAdminService();
//     toast.success("Logout Success");
//     return response;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const errorMessage = error.response?.data?.message || "Logout Failed";
//       toast.error(errorMessage);
//     } else {
//       toast.error("An unexpected error occurred");
//     }
//   }
// });

// export const logoutAdminSlice = createSlice({
//   name: "logoutAdmin",
//   initialState: INITIAL_STATE,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(logoutAdmin.pending, (state) => {
//       state.isLoggedIn = false;
//       state.user = null;
//       state.loading = true;
//     });
//     builder.addCase(logoutAdmin.fulfilled, (state, action) => {
//       state.isLoggedIn = true;
//       state.user = action.payload;
//       localStorage.setItem("userId", action.payload.user.id);
//       location.replace("/admin");
//       toast.success("Login Success");
//       state.loading = false;
//     });
//   },
// });
