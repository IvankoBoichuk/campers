import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCamps } from "@/api";

export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await getCamps();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : String(error),
      );
    }
  },
);
