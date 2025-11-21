import React from "react";
import styles from "@/Components/App/UnderConstruction.module.css";

const UnderConstruction = () => {
  return (
    <div className={styles.constructionContainer}>
      <div className={styles.constructionContent}>
        <h1 className={styles.constructionTitle}>
          🚧 Site Under Construction 🚧
        </h1>
        <p className={styles.constructionMessage}>
          We're working hard to bring you an amazing experience! Please check
          back soon.
        </p>
        <div className={styles.constructionAnimation}>
          <div className={styles.crane}></div>
          <div className={styles.building}></div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
