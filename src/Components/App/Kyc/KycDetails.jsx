import React from "react";
import { useUserVerification } from "../Login/Auth/useUserVerification";
import NavBar from "../NavBar/NavBar";
import styles from "./KycDetails.module.css";

const KycDetails = () => {
  const { verified, kyc_status } = useUserVerification();

  const getStatusDisplay = () => {
    switch (kyc_status) {
      case "verified":
        return {
          badge: "✅ Verified",
          class: styles.verified,
          message: "Your KYC verification has been completed successfully!",
          showButton: false,
        };
      case "pending":
        return {
          badge: "⏳ Under Review",
          class: styles.pending,
          message:
            "Your KYC application is being reviewed! Our team is working hard to verify your information. This usually takes 1-3 business days.",
          subMessage: "Thank you for your patience! 🙏",
          showButton: true,
          buttonText: "View Details",
        };
      case "rejected":
        return {
          badge: "❌ Rejected",
          class: styles.rejected,
          message:
            "Your KYC verification has been rejected. Please contact support for assistance.",
          subMessage: "Don't worry, you can fix this! 💪",
          showButton: true,
          buttonText: "View Details",
        };
      default:
        return {
          badge: "📝 Not Submitted",
          class: styles.unverified,
          message: "You haven't submitted your KYC information yet.",
          showButton: true,
          buttonText: "Fill KYC Form",
        };
    }
  };

  const status = getStatusDisplay();

  const handleButtonClick = () => {
    window.location.href = "/dashboard/kyc/form";
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.detailsCard}>
          <div className={styles.header}>
            <h1 className={styles.title}>KYC Verification Status</h1>
            <p className={styles.subtitle}>
              Track your KYC verification progress
            </p>
          </div>

          <div className={styles.statusSection}>
            <div className={styles.statusCard}>
              <h3>Current Status</h3>

              <div className={styles.statusItem}>
                <span>Account Verification:</span>
                <span
                  className={`${styles.statusBadge} ${
                    verified ? styles.verified : styles.pending
                  }`}
                >
                  {verified ? "✅ Verified" : "⏳ Pending"}
                </span>
              </div>

              <div className={styles.statusItem}>
                <span>KYC Status:</span>
                <span className={`${styles.statusBadge} ${status.class}`}>
                  {status.badge}
                </span>
              </div>

              <div className={styles.messageSection}>
                {kyc_status === "pending" && (
                  <div className={styles.waitingMessage}>
                    <div className={styles.waitingIcon}>💫</div>
                    <p>
                      {status.message}
                      <br />
                      <span className={styles.waitingSubtext}>
                        {status.subMessage}
                      </span>
                    </p>
                  </div>
                )}

                {kyc_status === "rejected" && (
                  <div className={styles.rejectedMessage}>
                    <div className={styles.rejectedIcon}>🔄</div>
                    <p>
                      {status.message}
                      <br />
                      <span className={styles.rejectedSubtext}>
                        {status.subMessage}
                      </span>
                    </p>
                  </div>
                )}

                {kyc_status === "verified" && (
                  <div className={styles.successMessage}>
                    <div className={styles.successIcon}>🎉</div>
                    <p>{status.message}</p>
                  </div>
                )}

                {!kyc_status && (
                  <div className={styles.infoMessage}>
                    <div className={styles.infoIcon}>📝</div>
                    <p>{status.message}</p>
                  </div>
                )}
              </div>

              {status.showButton && (
                <div className={styles.actionSection}>
                  <button
                    className={styles.actionButton}
                    onClick={handleButtonClick}
                  >
                    {status.buttonText}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycDetails;
