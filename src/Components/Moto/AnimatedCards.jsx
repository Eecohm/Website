import React, { useState } from 'react';
import { FaBook, FaLeaf, FaLightbulb } from 'react-icons/fa';
import styles from './AnimatedCards.module.css';

const AnimatedCards = () => {
  const [clickedCard, setClickedCard] = useState(null);

  const handleClick = (card) => {
    setClickedCard(clickedCard === card ? null : card); // Toggle click state
  };

  return (
    <div className={styles.cardsContainer}>
      {/* Card 1: Learn */}
      <div
        className={`${styles.card} ${clickedCard === 'learn' ? styles.clicked : ''}`}
        onClick={() => handleClick('learn')}
      >
        <FaBook className={styles.cardIcon} />
        <h3 className={styles.cardTitle}>LEARN</h3>
        <span className={styles.star1}>★</span>
        <span className={styles.dot1}>•</span>
        <span className={styles.star2}>★</span>
        <span className={styles.dot2}></span>
      </div>

      {/* Card 2: Grow */}
      <div
        className={`${styles.card} ${clickedCard === 'grow' ? styles.clicked : ''}`}
        onClick={() => handleClick('grow')}
      >
        <FaLeaf className={styles.cardIcon} />
        <h3 className={styles.cardTitle}>GROW</h3>
        <span className={styles.star1}>★</span>
        <span className={styles.dot1}>•</span>
        <span className={styles.star2}>★</span>
        <span className={styles.dot2}></span>
      </div>

      {/* Card 3: Innovate */}
      <div
        className={`${styles.card} ${clickedCard === 'innovate' ? styles.clicked : ''}`}
        onClick={() => handleClick('innovate')}
      >
        <FaLightbulb className={styles.cardIcon} />
        <h3 className={styles.cardTitle}>INNOVATE</h3>
        <span className={styles.star1}>★</span>
        <span className={styles.dot1}>•</span>
        <span className={styles.star2}>★</span>
        <span className={styles.dot2}></span>
      </div>
    </div>
  );
};

export default AnimatedCards;