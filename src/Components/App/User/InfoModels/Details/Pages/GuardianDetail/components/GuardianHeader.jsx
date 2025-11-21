import React from "react";
import { FileText } from "lucide-react";
import styles from "@/Components/App/User/InfoModels/Details/Pages/GuardianDetail/components/GuardianHeader.module.css";

export const GuardianHeader = ({ onEdit }) => (
  <div className={styles.header}>
    <h1 className={styles.title}>Guardian Profile</h1>
    <button onClick={onEdit} className={styles.editButton}>
      <FileText size={16} />
      Edit details
    </button>
    <button onClick={() => window.history.back()} className={styles.backBtn}>
      Back
    </button>
  </div>
);
