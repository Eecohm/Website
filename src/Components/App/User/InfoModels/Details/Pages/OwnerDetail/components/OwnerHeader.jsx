import React from "react";
import { FileText } from "lucide-react";
import styles from "./OwnerHeader.module.css";

export const OwnerHeader = ({ onEdit }) => (
  <div className={styles.header}>
    <h1 className={styles.title}>Owner Profile</h1>
    <button onClick={onEdit} className={styles.editButton}>
      <FileText size={16} />
      Edit details
    </button>
    <button className={styles.backButton} onClick={() => window.history.back()}>
      Back
    </button>
  </div>
);
