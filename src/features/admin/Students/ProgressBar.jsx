import React from "react";
import styles from "@/features/admin/Students/Students.module.css";

const ProgressBar = ({ currentPart, currentSection }) => {
  let currentProgress = 0;
  if (currentPart === 1) currentProgress = currentSection === 1 ? 25 : 50;
  else if (currentPart === 2) currentProgress = 75;
  else if (currentPart === 3) currentProgress = 100;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${currentProgress}%` }}
        />
      </div>
      <div className={styles.progressText}>Part {currentPart} of 3</div>
    </div>
  );
};

export default ProgressBar;
