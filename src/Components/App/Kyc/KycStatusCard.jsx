import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Login/Auth/AuthContext";
import styles from "./KycStatusCard.module.css";

const KycStatusCard = ({ kycStatus, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const getStatusText = () => {
    switch (kycStatus?.toLowerCase()) {
      case "verified":
        return "Verified";
      case "rejected":
        return "Rejected";
      case "pending":
        return "Pending";
      case "unverified":
      default:
        return "Unverified";
    }
  };

  const getStatusStyle = () => {
    switch (kycStatus?.toLowerCase()) {
      case "verified":
        return styles.statusApproved;
      case "rejected":
        return styles.statusRejected;
      case "pending":
        return styles.statusPending;
      case "unverified":
      default:
        return styles.statusUnverified;
    }
  };

  const handleViewDetails = () => {
    navigate("/dashboard/kyc/form");
    onClose();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleBackToDashboard = () => {
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* Status Display */}
        <div className={styles.statusSection}>
          <h2 className={styles.title}>KYC Status</h2>
          <div className={`${styles.statusBadge} ${getStatusStyle()}`}>
            {getStatusText()}
          </div>
          <p className={styles.statusDescription}>
            {kycStatus?.toLowerCase() === "verified" &&
              "Your identity has been successfully verified."}
            {kycStatus?.toLowerCase() === "rejected" &&
              "Your KYC application was rejected. Please review and resubmit."}
            {kycStatus?.toLowerCase() === "pending" &&
              "Your KYC application is under review. Please wait for approval."}
            {(kycStatus?.toLowerCase() === "unverified" || !kycStatus) &&
              "Your identity verification is incomplete."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className={styles.buttonContainer}>
          <button className={styles.primaryButton} onClick={handleViewDetails}>
            View Details
          </button>

          <button className={styles.secondaryButton} onClick={handleLogout}>
            Logout
          </button>

          <button
            className={styles.tertiaryButton}
            onClick={handleBackToDashboard}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default KycStatusCard;
