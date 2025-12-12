import React from "react";
import { AlertTriangle } from "lucide-react";
import styles from "@/features/admin/User/InfoModels/Details/Pages/GuardianDetail/components/StateComponents.module.css";
import containerStyles from "@/features/admin/User/InfoModels/Details/Pages/GuardianDetail/components/Container.module.css";

export const LoadingState = () => (
  <div className={containerStyles.detailContainer}>
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading guardian details...</p>
    </div>
  </div>
);

export const ErrorState = ({ error }) => (
  <div className={containerStyles.detailContainer}>
    <div className={styles.errorContainer}>
      <AlertTriangle className={styles.errorIcon} />
      <p className={styles.errorText}>{error}</p>
    </div>
  </div>
);
