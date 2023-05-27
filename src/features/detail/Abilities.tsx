import React, { useContext } from "react";
import styles from "./Detail.module.css";
import { PokemonContext } from "./Detail";
import {
  Ability,
  useGetPokemonAbilitiesQuery,
} from "../../app/services/pokemon";
import { capitalizeFirstLetter } from "../../utilities/text";

function Abilities() {
  const pokemon = useContext(PokemonContext);
  const { data, isLoading, error } = useGetPokemonAbilitiesQuery(
    pokemon?.id ?? 0
  );

  if (isLoading) {
    return <div>Loading abilities...</div>;
  }

  if (error) {
    return <div>Failed to fetch abilities.</div>;
  }

  return (
    <>
      {data?.abilities?.map(({ ability: { effects, id, name } }: Ability) => (
        <div key={id} className={styles.detailContentBody}>
          <h4 className={styles.detailContentTitle}>
            {capitalizeFirstLetter(name)}
          </h4>
          {effects.map((effect) => (
            <p className={styles.detailContentDescription} key={effect.id}>
              {effect.short_effect}
            </p>
          ))}
        </div>
      ))}
    </>
  );
}

export { Abilities };
