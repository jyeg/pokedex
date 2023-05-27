import Pills from "../Pill/Pills";
import styles from "./Thumbnail.module.css";
interface ThumbnailProps {
  id: number;
  image?: string;
  name: string;
  types?: string[];
  clickHandler: (id: number) => void;
}

// TODO: write tests for this component.
function Thumbnail({ id, name, image, types, clickHandler }: ThumbnailProps) {
  return (
    <div
      className={`${styles.thumbnail} background-color-${types![0]}`}
      onClick={() => clickHandler(id)}
    >
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} alt={name} />
      </div>
      <p className={styles.name}>{name}</p>
      <p className={styles.id}>#{id}</p>
      <Pills types={types ?? []} />
    </div>
  );
}

export default Thumbnail;
