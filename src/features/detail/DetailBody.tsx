import React, { useContext, useState } from "react";
import styles from "./Detail.module.css";
import { Abilities } from "./Abilities";
import { Moves } from "./Moves";

enum DetailTabs {
  ABILITIES = "Abilities",
  MOVES = "Moves",
  SPECIES = "Species",
  SPRITES = "Sprites",
  TYPES = "Types",
}

const TabMap = {
  [DetailTabs.ABILITIES]: <Abilities />,
  [DetailTabs.MOVES]: <Moves />,
  [DetailTabs.SPECIES]: <div>Species TODO</div>,
  [DetailTabs.SPRITES]: <div>Sprites TODO</div>,
  [DetailTabs.TYPES]: <div>Types TODO</div>,
};

function DetailBody() {
  const [selectedDetailTab, setSelectedDetailTab] = useState<DetailTabs>(
    DetailTabs.ABILITIES
  );

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
