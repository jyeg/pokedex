import React, { useContext } from "react";
import styles from "./Detail.module.css";
import { PokemonContext } from "./Detail";
import { Move, useGetPokemonMovesQuery } from "../../app/services/pokemon";
import { capitalizeFirstLetter } from "../../utilities/text";

function Moves() {
  const pokemon = useContext(PokemonContext);
  const { data, isLoading, error } = useGetPokemonMovesQuery(pokemon?.id ?? 0);

  if (isLoading) {
    return <div>Loading moves...</div>;
  }

  if (error) {
    return <div>Failed to fetch moves.</div>;
  }

  return (
    <>
      {data?.moves?.map(({ move: { name, power, accuracy } }: Move) => (
        <div key={name} className={styles.detailContentBody}>
          <h4 className={styles.detailContentTitle}>
            {capitalizeFirstLetter(name)}
          </h4>
          <p className={styles.detailContentDescription}>Power: {power}</p>
          <p className={styles.detailContentDescription}>
            Accuracy: {accuracy}
          </p>
        </div>
      ))}
    </>
  );
}

export { Moves };
