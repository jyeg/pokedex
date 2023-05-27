import styles from "./Thumbnail.module.css";
import appStyles from "../../app.module.css";
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
      <div className={styles.types}>
        {types?.map((type) => (
          <span
            className={`${styles.type} background-color-${type}`}
            key={type}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Thumbnail;
