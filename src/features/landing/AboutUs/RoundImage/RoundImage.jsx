import React from "react";
import styles from "@/features/landing/AboutUs/RoundImage/RoundImage.module.css";

const RoundImage = ({ imageSrc, altText }) => {
  return (
    <div className={styles.roundImageContainer}>
      <img src={imageSrc} alt={altText} className={styles.roundImage} />
      <div className={styles.hoverGraphics}>
        {/* Graphics content */}
        <div className={`${styles.graphicCircle} ${styles.graphic1}`}></div>
        <div className={`${styles.graphicCircle} ${styles.graphic2}`}></div>
        <div className={`${styles.graphicCircle} ${styles.graphic3}`}></div>
      </div>
    </div>
  );
};

export default RoundImage;
