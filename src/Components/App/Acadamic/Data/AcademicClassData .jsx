import styles from "@/Components/App/Acadamic/Academic.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const AcademicClassData = () => {
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
    <div className={styles.dataCard}>
      <h3>Academic Class Saved</h3>
      <p>Academic Year ID: {data.academicYearId}</p>
      <p>Grade ID: {data.gradeId}</p>
      <p>Faculty ID: {data.facultyId}</p>
      <p>Section: {data.section}</p>

      <button onClick={() => navigate(-1)} className={styles.backButton}>
        ← Back
      </button>
    </div>
  );
};

export default AcademicClassData;
