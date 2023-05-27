import React from "react";
import styles from "./Pill.module.css";

export default function Pills({
  types,
  classes,
}: {
  types: string[];
  classes?: string;
}) {
  return (
    <div className={`${styles.types} ${classes}`}>
      {types?.map((type) => (
        <span className={`${styles.type} background-color-${type}`} key={type}>
          {type}
        </span>
      ))}
    </div>
  );
}
