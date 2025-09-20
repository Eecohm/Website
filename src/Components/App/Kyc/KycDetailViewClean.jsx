// components/KycDetailView.jsx
import React from "react";
import { useAuth } from "../Login/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./KycDetailViewClean.module.css";
import NavBar from "../NavBar/NavBar";

const KycDetailView = ({ onBack }) => {
  const { kyc_status, role } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate("/dashboard");
  };

  const handleFillKycForm = () => {
    navigate("/dashboard/kyc/form");
  };

  return (
    <>
      <NavBar />
      <div className={styles.overlay}>
        <div className={styles.kycDetailContainer}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>KYC Verification Status</h1>
            <button
              onClick={handleBack}
              className={`${styles.btn} ${styles["btn-secondary"]}`}
            >
              ← Back to Dashboard
            </button>
          </div>

          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Left Section */}
            <div className={styles.leftSection}>
              <div className={styles.detailsCard}>
                <h2 className={styles.sectionTitle}>
                  KYC Verification Details
                </h2>

                {role && (
                  <div className={styles.roleInfo}>
                    <span className={styles.roleLabel}>Current Role:</span>
                    <span className={styles.roleBadge}>{role}</span>
                  </div>
                )}

                <div className={styles.statusExplanation}>
                  <div className={styles.statusRow}>
                    <div className={styles.statusInfo}>
                      <span className={styles.statusLabel}>
                        Current Status:
                      </span>
                      <span className={styles.statusValue}>
                        {(kyc_status || "UNVERIFIED").toUpperCase()}
                      </span>
                    </div>
                    <div className={styles.statusAction}>
                      {(!kyc_status || kyc_status === "unverified") && (
                        <span className={styles.actionText}>
                          Ready to Start KYC Process
                        </span>
                      )}
                      {kyc_status === "pending" && (
                        <span className={styles.actionText}>Under Review</span>
                      )}
                      {kyc_status === "rejected" && (
                        <span className={styles.actionText}>
                          Needs Revision
                        </span>
                      )}
                      {kyc_status === "verified" && (
                        <span className={styles.actionText}>
                          Verification Complete
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={handleFillKycForm}
                  className={`${styles.btn} ${styles["btn-warning"]} ${styles.ctaBtn}`}
                >
                  📋 Fill KYC Form
                </button>

                <div className={styles.verificationInfo}>
                  <p>Complete your KYC verification to access all features.</p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className={styles.rightSection}>
              <div className={styles.detailsCard}>
                <div className={styles.noDataMessage}>
                  <h3>Ready to Start KYC Process</h3>
                  <p>
                    You haven't submitted your KYC information yet. Click the
                    button on the left to begin the verification process.
                  </p>
                  <div className={styles.requirements}>
                    <h4>You'll need:</h4>
                    <ul>
                      <li>📄 Government-issued ID (front and back)</li>
                      <li>🤳 Selfie with your ID</li>
                      <li>📝 Personal information (name, address, etc.)</li>
                      <li>👤 Role selection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycDetailView;
