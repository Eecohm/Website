import { useLocation } from "react-router-dom";
import styles from "../Acadamic.module.css";

const AcademicYearData = () => {
  const location = useLocation();
  const data = location.state?.data;

  if (!data) {
    return (
      <p className={styles.error}>
        No data found. Please submit the form first.
      </p>
    );
  }

  return (
    <div className={styles.dataCard}>
      <h2 className={styles.dataTitle}>Academic Year & Program Details</h2>
      <div className={styles.dataItem}>
        <strong>Start Date:</strong> {data.startDate}
      </div>
      <div className={styles.dataItem}>
        <strong>End Date:</strong> {data.endDate}
      </div>
      <div className={styles.dataItem}>
        <strong>Program Name:</strong> {data.programName}
      </div>
      <div className={styles.dataItem}>
        <strong>Duration (Months):</strong> {data.durationMonths}
      </div>
      <div className={styles.dataItem}>
        <strong>Previous Program ID:</strong> {data.previousProgramId || "None"}
      </div>
      <div className={styles.dataItem}>
        <strong>Affiliated To:</strong> {data.affiliatedTo}
      </div>
    </div>
  );
};

export default AcademicYearData;
