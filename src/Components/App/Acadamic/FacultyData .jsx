import React from "react";
import styles from "./Acadamic.module.css";

const FacultyData = ({ data }) => {
  return (
    <div className={styles.dataCard}>
      <h3>Faculty Saved</h3>
      <p>Name: {data.facultyName}</p>
      <p>Program ID: {data.programId}</p>
    </div>
  );
};

export default FacultyData;
