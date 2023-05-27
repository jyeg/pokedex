import React, { createContext } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks/hooks";
import styles from "./Detail.module.css";
import { selectPokemonDetail, setSelectedPokemon } from "../search/searchSlice";
import { Pokemon, useGetPokemonQuery } from "../../app/services/pokemon";
import DetailBody from "./DetailBody";

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

  // fetch pokemon detail from the api for the selected pokemon
  return (
    <PokemonContext.Provider value={pokemon}>
      <div className={styles.detailCard}>
        <button
          className={styles.backButton}
          onClick={() => dispatch(setSelectedPokemon(undefined))}
        >
          {"Back"}
        </button>
        {error ? <div>Something went wrong</div> : null}
        <div className={styles.headerContainer}>
          <h1 className={styles.headerTitle}>{pokemon?.name}</h1>
          <p className={styles.headerSubtitle}>{pokemon?.id}</p>
        </div>
        <img className={styles.detailCardHeaderImage} src="a" alt="" />
        {pokemon && <DetailBody />}
      </div>
    </PokemonContext.Provider>
  );
}

export default Detail;
