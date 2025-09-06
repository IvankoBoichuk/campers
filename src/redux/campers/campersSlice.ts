import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "@/redux/campers/campersOps";
import type { Truck } from "@/types/Truck";

export const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    isLoading: false,
    error: null as null | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCampers
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

interface CampersState {
  items: Truck[];
  isLoading: boolean;
  error: null | unknown;
}

interface RootState {
  campers: CampersState;
}

export const selectCampers = (state: RootState) => state.campers.items;
export const selectLoading = (state: RootState) => state.campers.isLoading;
export const selectError = (state: RootState) => state.campers.error;

// export const selectFilteredCampers = createSelector(
//     [selectCampers, selectNameFilter],
//     (campers, nameFilter) =>
//         campers.filter(contact =>
//             contact.name.toLowerCase().includes(nameFilter)
//         )
// );
export const campersReducer = campersSlice.reducer;
