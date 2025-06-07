import React from 'react';
import styles from './Background.module.css';

const Background = () => {
  return (
    <>
      <div className={styles.shadow}></div>
      <div className={styles.mainText}>
        <h1>EECOHM SCHOOL OF EXCELLENCE</h1>
        <h2>Learn . Grow . Innovate</h2>
        <p>
          Shaping future leaders in Hospitality, Business, and Computer Science with innovation,
          hands-on learning, and growth-focused ECAs.
        </p>
      </div>
    </>
  );
};

export default Background;