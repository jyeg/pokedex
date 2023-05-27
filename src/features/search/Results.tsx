import { useAppDispatch } from "../../app/hooks/hooks";

import { addToHistory, setSelectedPokemon } from "./searchSlice";
import styles from "./Search.module.css";
import { useSearchPokemonByNameQuery } from "../../app/services/pokemon";
import Thumbnail from "../../app/components/Thumbnail/Thumbnail";
import { useEffect } from "react";
import { Loading } from "../../app/components/Loading/Loading";

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

  if (!isLoading && error) {
    return <div>Something went wrong :(</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.resultsContainer} data-testid="results-container">
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
        <div>No Pokémon found :(</div>
      )}
    </div>
  );
}
