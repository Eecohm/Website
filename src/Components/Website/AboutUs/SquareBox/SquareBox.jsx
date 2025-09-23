import React from 'react';
import styles from './SquareBox.module.css';

const SquareBox = ({ imageSrc, backgroundColor, onClick, id }) => {
  return (
    <div
      className={styles.squareBox}
      style={{ backgroundColor }}
      onClick={() => onClick(id)} // Pass the id to identify which box was clicked
    >
      <img src={imageSrc} alt="2D Graphic" className={styles.squareGraphic} />
    </div>
  );
};

export default SquareBox;