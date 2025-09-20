// src/Components/App/Kyc/KycVerificationCard.jsx
import React from "react";
import styles from "./KycVerificationCard.module.css";

const KycVerificationCard = ({ status, onCheck, onBack, onViewDetails }) => {
  const getStatusDetails = () => {
    switch (status) {
      case "unverified":
        return {
          title: "KYC Verification Required",
          message:
            "You need to complete KYC verification to access the dashboard.",
          buttonText: "Start Verification",
          icon: "🔒",
        };
      case "rejected":
        return {
          title: "KYC Verification Rejected",
          message:
            "Your KYC submission was not approved. Please review and resubmit.",
          buttonText: "Resubmit Verification",
          icon: "❌",
        };
      default:
        return {
          title: "KYC Verification",
          message: "Your KYC status needs attention.",
          buttonText: "Check Status",
          icon: "ℹ️",
        };
    }
  };

  const statusInfo = getStatusDetails();

  return (
    <div className={styles.verificationCard}>
      <div className={styles.cardHeader}>
        <span
          className={
            status === "rejected" ? styles.rejectedIcon : styles.defaultIcon
          }
        >
          {statusInfo.icon}
        </span>
        <h2>{statusInfo.title}</h2>
      </div>

      <div className={styles.cardBody}>
        <p>{statusInfo.message}</p>

        {(status === "rejected" || status === "unverified") && (
          <button className={styles.detailsButton} onClick={onViewDetails}>
            View Details
          </button>
        )}
      </div>

      <div className={styles.cardFooter}>
        <button className={styles.backButton} onClick={onBack}>
          Back to Home
        </button>
        <button className={styles.checkButton} onClick={onCheck}>
          {statusInfo.buttonText}
        </button>
      </div>
    </div>
  );
};

export default KycVerificationCard;
