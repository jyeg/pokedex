import React, { createContext } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks/hooks";
import styles from "./Detail.module.css";
import { selectPokemonDetail, setSelectedPokemon } from "../search/searchSlice";
import { Pokemon, useGetPokemonQuery } from "../../app/services/pokemon";
import DetailBody from "./DetailBody";
import Pills from "../../app/components/Pill/Pills";

export const PokemonContext = createContext<Pokemon | undefined>(undefined);

function Detail() {
  const dispatch = useAppDispatch();
  const selectedPokemon = useAppSelector(selectPokemonDetail);

  const {
    data: pokemon,
    isLoading,
    error,
  } = useGetPokemonQuery(selectedPokemon ?? 0, {
    skip: !selectedPokemon,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PokemonContext.Provider value={pokemon}>
      <div className={styles.detailCard} data-testid="details-container">
        <button
          className={styles.backButton}
          data-testid="back-button"
          onClick={() => dispatch(setSelectedPokemon(undefined))}
        >
          {"Back"}
        </button>
        {error ? <div>Something went wrong</div> : null}
        <div className={styles.headerContainer}>
          <h1 className={styles.headerTitle}>{pokemon?.name}</h1>
          <p className={styles.headerSubtitle}>#{pokemon?.id}</p>
        </div>
        <Pills
          classes={styles.pills}
          types={pokemon?.types?.map((type) => type.pokemon_v2_type.name) ?? []}
        />
        <div
          className={`${styles.imageContainer} background-color-${
            pokemon?.types![0].pokemon_v2_type.name
          }`}
        >
          <img
            className={styles.detailCardHeaderImage}
            src={pokemon?.image}
            alt={pokemon?.name}
          />
        </div>

        {pokemon && <DetailBody />}
      </div>
    </PokemonContext.Provider>
  );
}

export default Detail;
