import React from "react";
import styles from "./Acadamic.module.css";

const GradeData = ({ data }) => {
  return (
    <div className={styles.dataCard}>
      <h3>Grade Saved</h3>
      <p>Name: {data.gradeName}</p>
      <p>Program ID: {data.programId}</p>
    </div>
  );
};

export default GradeData;
