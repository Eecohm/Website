import { useLocation, useNavigate } from "react-router-dom";
import styles from "../Academic.module.css";

const GradeData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  if (!data) {
    return (
      <p className={styles.error}>
        No data found. Please submit the form first.
      </p>
    );
  }
  return (
    <div className={styles.cardContainer}>
      <h3>Grade Saved</h3>
      <p>Name: {data.gradeName}</p>
      <p>Program ID: {data.programId}</p>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        ← Back
      </button>
    </div>
  );
};

export default GradeData;
