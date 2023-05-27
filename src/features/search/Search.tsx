import { useAppSelector, useAppDispatch } from "../../app/hooks/hooks";
import {
  selectHistory,
  selectSearchTerm,
  setSearchTerm,
  setSelectedPokemon,
} from "./searchSlice";
import styles from "./Search.module.css";

export function Search() {
  const history = useAppSelector(selectHistory);
  const searchTerm = useAppSelector(selectSearchTerm);

  const dispatch = useAppDispatch();

  return (
    <>
      <div className={styles.row}>
        <input
          type="text"
          onChange={(event) => dispatch(setSearchTerm(event.target.value))}
          placeholder="Name"
          aria-label="Set pokemon search term"
          value={searchTerm}
          className={styles.textbox}
          data-testid="search-input"
        />
      </div>
      <div className={styles.historyList}>
        <h4 className={styles.historyHeader}>Search History</h4>
        {history.map((item) => (
          <button
            data-testid={`history-${item}`}
            key={item}
            onClick={() => {
              dispatch(setSelectedPokemon(undefined));
              dispatch(setSearchTerm(item));
            }}
            className={styles.historyListItem}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}
