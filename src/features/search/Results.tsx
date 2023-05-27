import { useAppSelector, useAppDispatch } from "../../app/hooks/hooks";
import logo from "../../logo.svg";
import { addToHistory, setSelectedPokemon } from "./searchSlice";
import styles from "./Search.module.css";
import { useSearchPokemonByNameQuery } from "../../app/services/pokemon";
import Thumbnail from "../../app/components/Thumbnail";
import { Suspense, useEffect } from "react";

export function Results({ searchTerm }: { searchTerm: string }) {
  const {
    data: pokemon,
    isLoading,
    error,
  } = useSearchPokemonByNameQuery(searchTerm);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchTerm !== "") {
      dispatch(addToHistory(searchTerm));
    }
  }, [searchTerm]);

  if (isLoading) {
    return (
      <div className="App-loading">
        <img src={logo} className="App-loader" alt="logo" />
      </div>
    );
  }

  if (!isLoading && error) {
    return <div>Something went wrong :(</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.resultsContainer}>
        {pokemon?.length ? (
          pokemon.map((item) => (
            <Thumbnail
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              types={item?.types?.map((type) => type.pokemon_v2_type.name)}
              clickHandler={() => dispatch(setSelectedPokemon(item.id))}
            />
          ))
        ) : (
          <div>No pokemon found :(</div>
        )}
      </div>
    </Suspense>
  );
}
