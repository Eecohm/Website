import { useLocation, useNavigate } from "react-router-dom";
import styles from "../Acadamic.module.css";

const FacultyData = () => {
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
    <>
      <div className={styles.dataCard}>
        <h3>Faculty Saved</h3>
        <p>
          <strong>Name:</strong> {data.facultyName}
        </p>
        <p>
          <strong>Program ID:</strong> {data.programId}
        </p>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          ← Back
        </button>
      </div>
    </>
  );
};

export default FacultyData;
