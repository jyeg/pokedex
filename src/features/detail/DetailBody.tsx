import React, { useContext, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks/hooks";
import styles from "./Detail.module.css";
import { selectPokemonDetail, setSelectedPokemon } from "../search/searchSlice";
import { Pokemon, useGetPokemonQuery } from "../../app/services/pokemon";
import { Abilities } from "./Abilities";
import { PokemonContext } from "./Detail";

enum DetailTabs {
  ABILITIES = "Abilities",
  // MOVES = "Moves",
  // SPECIES = "Species",
  // SPRITES = "Sprites",
  // TYPES = "Types",
}

const TabMap = {
  [DetailTabs.ABILITIES]: <Abilities />,
};

function DetailBody() {
  const pokemon = useContext(PokemonContext);
  const [selectedDetailTab, setSelectedDetailTab] = useState<DetailTabs>(
    DetailTabs.ABILITIES
  );

  // fetch pokemon detail from the api for the selected pokemon
  return (
    <div className={styles.body}>
      <div className={styles.detailTabs}>
        {Object.values(DetailTabs).map((tab) => (
          <span
            onClick={() => {
              setSelectedDetailTab(tab);
            }}
            key={tab}
            data-testid={`detail-tab-${tab}`}
            className={`${styles.detailTab} ${
              selectedDetailTab === tab ? styles.detailTabActive : ""
            }`}
          >
            {tab}
          </span>
        ))}
      </div>
      <div className={styles.detailContent}>{TabMap[selectedDetailTab]}</div>
    </div>
  );
}

export default DetailBody;
