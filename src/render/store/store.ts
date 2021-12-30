import { configureStore } from "@reduxjs/toolkit";
import RouterSlice from "../modules/router/router.slice";

export const store = configureStore({
  reducer: {
    router: RouterSlice
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
