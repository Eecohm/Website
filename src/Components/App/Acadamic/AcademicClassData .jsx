import React from "react";
import styles from "./Acadamic.module.css";

const AcademicClassData = ({ data }) => {
  return (
    <div className={styles.dataCard}>
      <h3>Academic Class Saved</h3>
      <p>Academic Year ID: {data.academicYearId}</p>
      <p>Grade ID: {data.gradeId}</p>
      <p>Faculty ID: {data.facultyId}</p>
      <p>Section: {data.section}</p>
    </div>
  );
};

export default AcademicClassData;
