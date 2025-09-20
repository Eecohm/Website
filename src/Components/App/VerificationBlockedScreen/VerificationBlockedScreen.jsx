import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./VerificationBlockedScreen.module.css";

/**
 * Component to display when user access is blocked due to verification status
 * Shows appropriate message and actions based on verification status
 */
const VerificationBlockedScreen = ({
  status,
  message,
  action,
  showHomeButton = true,
  showLogoutButton = true,
}) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (action?.path) {
      navigate(action.path);
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    // This will be handled by auth context
    window.location.href = "/login";
  };

  const getStatusIcon = () => {
    switch (status) {
      case "pending":
        return "⏳";
      case "rejected":
        return "❌";
      case "incomplete":
        return "📝";
      default:
        return "🔒";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "#f39c12"; // Orange
      case "rejected":
        return "#e74c3c"; // Red
      case "incomplete":
        return "#3498db"; // Blue
      default:
        return "#95a5a6"; // Gray
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.statusIcon} style={{ color: getStatusColor() }}>
          {getStatusIcon()}
        </div>

        <h1 className={styles.title}>Access Restricted</h1>

        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          {action && (
            <button
              className={`${styles.actionButton} ${styles[action.type]}`}
              onClick={handleAction}
            >
              {action.text}
            </button>
          )}

          {showHomeButton && (
            <button
              className={`${styles.actionButton} ${styles.secondary}`}
              onClick={handleHome}
            >
              Go to Home
            </button>
          )}

          {showLogoutButton && (
            <button
              className={`${styles.actionButton} ${styles.logout}`}
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>

        <div className={styles.helpText}>
          <p>
            Need help?{" "}
            <a href="/contact" className={styles.helpLink}>
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationBlockedScreen;
