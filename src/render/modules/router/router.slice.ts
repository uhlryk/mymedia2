import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

import { RouterState } from "./routerState.type";

const initialState: RouterState = {
  location: '',
  loader: true
};

export const routerSlice = createSlice({
  name: "router",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.loader = true;
    },
    hideLoader: (state) => {
      state.loader = false;
    },
  },
});

export const { hideLoader, showLoader } = routerSlice.actions;

export const selectLoader = (state: RootState): boolean  => state.router.loader;

export default routerSlice.reducer;