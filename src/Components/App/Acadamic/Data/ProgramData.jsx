import { useLocation, useNavigate } from "react-router-dom";
import styles from "../Academic.module.css";

const ProgramData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const program = location.state?.program;

  if (!program) {
    return (
      <p className={styles.error}>
        No data found. Please submit the form first.
      </p>
    );
  }

  return (
    <div className={styles.cardContainer}>
      <h2>Saved Program Details</h2>
      <div className={styles.dataCard}>
        <p>
          <strong>Program Name:</strong> {program.programName}
        </p>
        <p>
          <strong>Duration:</strong> {program.durationMonths} months
        </p>
        <p>
          <strong>Previous Program ID:</strong>{" "}
          {program.previousProgramId || "None"}
        </p>
        <p>
          <strong>Affiliated To:</strong> {program.affiliatedTo}
        </p>
      </div>

      <button onClick={() => navigate(-1)} className={styles.backButton}>
        ← Back
      </button>
    </div>
  );
};

export default ProgramData;
