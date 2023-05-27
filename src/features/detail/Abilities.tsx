import React, { Suspense, useContext } from "react";
import styles from "./Detail.module.css";
import { PokemonContext } from "./Detail";
import {
  Ability,
  useGetPokemonAbilitiesQuery,
} from "../../app/services/pokemon";

function Abilities() {
  const pokemon = useContext(PokemonContext);
  const { data, isLoading, error } = useGetPokemonAbilitiesQuery(
    pokemon?.id ?? 0
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.detailContentBody}>
        {data?.abilities?.map(({ ability: { effects, id, name } }: Ability) => (
          <div key={id}>
            <h4>{name}</h4>
            {effects.map((effect) => (
              <p key={effect.id}>{effect.short_effect}</p>
            ))}
          </div>
        ))}
      </div>
    </Suspense>
  );
}

export { Abilities };
