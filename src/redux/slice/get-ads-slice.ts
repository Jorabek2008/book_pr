import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAdsService } from "../service";
import toast from "react-hot-toast";

interface Ad {
  id: number;
  title_uz: string;
  image: string;
  createdAt: string;
  view_count: number;
  // Add other fields as needed
}

interface IAdsState {
  ads: Ad[];
  loading: boolean;
  error: string | null;
}

const INITIAL_STATE: IAdsState = {
  ads: [],
  loading: false,
  error: null,
};

export const getAdsThunk = createAsyncThunk("getAds", async () => {
  try {
    const response = await getAdsService();
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message || "Error fetching ads");
    } else {
      toast.error("An unexpected error occurred");
    }
    throw error;
  }
});

export const getAdsSlice = createSlice({
  name: "getAds",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAdsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdsThunk.fulfilled, (state, action) => {
      state.ads = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getAdsThunk.rejected, (state, action) => {
      state.error = action.error.message || "Error fetching ads";
      state.loading = false;
    });
  },
});
