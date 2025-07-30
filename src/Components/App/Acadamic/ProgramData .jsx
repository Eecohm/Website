import React from "react";
import styles from "./Acadamic.module.css";

const ProgramData = ({ data }) => {
  return (
    <div className={styles.dataCard}>
      <h3>Program Saved</h3>
      <p>Name: {data.programName}</p>
      <p>Duration: {data.durationMonths} months</p>
      <p>Previous: {data.previousProgramId || "None"}</p>
      <p>Affiliated To: {data.affiliatedTo}</p>
    </div>
  );
};

export default ProgramData;
