import React from "react";
import { FileText } from "lucide-react";
import styles from "@/Components/App/User/InfoModels/Details/Pages/EmployeeDetail/components/EmployeeHeader.module.css";

export const EmployeeHeader = ({ onEdit }) => (
  <div className={styles.header}>
    <h1 className={styles.title}>Employee Profile</h1>
    <button onClick={onEdit} className={styles.editButton}>
      <FileText size={16} />
      Edit details
    </button>
    <button onClick={() => window.history.back()} className={styles.backBtn}>
      Back
    </button>
  </div>
);
