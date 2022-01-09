import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { openSeaService } from "./service";

export const store = configureStore({
  reducer: {
    [openSeaService.reducerPath]: openSeaService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(openSeaService.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
