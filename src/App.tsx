import React from "react";
import { Search } from "./features/search/Search";
import "./App.css";
import { Results } from "./features/search/Results";
import { useDebounce } from "./app/hooks/useDebounce";
import { useAppSelector } from "./app/hooks/hooks";
import {
  selectSearchTerm,
  selectPokemonDetail,
} from "./features/search/searchSlice";
import Detail from "./features/detail/Detail";

function App() {
  const searchTerm = useAppSelector(selectSearchTerm);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const selectedPokemon = useAppSelector(selectPokemonDetail);

  return (
    <div className="App">
      <section className="Sidebar">
        <header className="Sidebar-header">
          <h3 className="Sidebar-title">Pokedex</h3>
          <p className="Sidebar-subTitle">Search for a Pokémon by name</p>
        </header>
        <Search />
      </section>
      <div className="Main">
        {selectedPokemon ? (
          <Detail />
        ) : (
          <Results searchTerm={debouncedSearchTerm} />
        )}
      </div>
    </div>
  );
}

export default App;
