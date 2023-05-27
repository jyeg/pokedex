import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import { pokemonApi } from "./services/pokemon";
export const store = configureStore({
  reducer: {
    search: searchReducer,
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
