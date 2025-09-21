import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Login/Auth/AuthContext";
import styles from "./PostLoginOptions.module.css";

const PostLoginOptions = ({ onHide }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleProvideInfo = () => {
    navigate("/dashboard/kyc/form");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleBackToDashboard = () => {
    // Hide the overlay instead of navigating
    if (onHide) {
      onHide();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome!</h1>
          <p className={styles.subtitle}>
            Please choose what you'd like to do next
          </p>
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={`${styles.optionButton} ${styles.primaryButton}`}
            onClick={handleProvideInfo}
          >
            <div className={styles.buttonIcon}>📝</div>
            <div className={styles.buttonContent}>
              <h3>Provide Info Details</h3>
              <p>Complete your KYC information</p>
            </div>
          </button>

          <button
            className={`${styles.optionButton} ${styles.secondaryButton}`}
            onClick={handleLogout}
          >
            <div className={styles.buttonIcon}>🚪</div>
            <div className={styles.buttonContent}>
              <h3>Log Out</h3>
              <p>Sign out of your account</p>
            </div>
          </button>

          <button
            className={`${styles.optionButton} ${styles.tertiaryButton}`}
            onClick={handleBackToDashboard}
          >
            <div className={styles.buttonIcon}>🏠</div>
            <div className={styles.buttonContent}>
              <h3>Back to Dashboard</h3>
              <p>Go to main dashboard</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostLoginOptions;
