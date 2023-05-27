import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface SearchState {
  searchTerm: string;
  history: string[];
  selectedPokemon?: number;
  selectedEvolution?: number;
}

const initialState: SearchState = {
  searchTerm: "",
  history: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addToHistory: (state, action: PayloadAction<string>) => {
      const newState = new Set([...state.history, action.payload]);
      state.history = [...newState];
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedPokemon: (state, action: PayloadAction<number | undefined>) => {
      state.selectedPokemon = action.payload;
    },
    setSelectedEvolution: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      state.selectedEvolution = action.payload;
    },
  },
});

export const { addToHistory, setSearchTerm, setSelectedPokemon } =
  searchSlice.actions;

export const selectSearchTerm = (state: RootState) => state.search.searchTerm;
export const selectHistory = (state: RootState) => state.search.history;
export const selectPokemonDetail = (state: RootState) =>
  state.search.selectedPokemon;
export const selectedPokemonEvolution = (state: RootState) =>
  state.search.selectedEvolution;

export default searchSlice.reducer;
