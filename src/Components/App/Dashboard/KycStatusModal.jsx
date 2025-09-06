import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./KycStatusModal.module.css";

const KycStatusModal = ({ userDetails, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show modal only if user is not verified
    if (userDetails && !userDetails.verified) {
      setShowModal(true);
    }
  }, [userDetails]);

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  const handleKycAction = () => {
    setShowModal(false);
    onClose();
    if (userDetails.kyc_status === "unverified") {
      navigate("/kyc-form"); // Navigate to KYC form
    } else if (userDetails.kyc_status === "rejected") {
      navigate("/support"); // Navigate to support/contact
    }
  };

  if (!showModal) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>KYC Verification Status</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            &times;
          </button>
        </div>

        <div className={styles.modalBody}>
          {!userDetails.verified && userDetails.kyc_status === "pending" && (
            <div className={styles.statusMessage}>
              <div className={styles.statusIcon}>⏳</div>
              <h3>KYC Verification Pending</h3>
              <p>
                Your KYC status is pending. Please wait for approval before you
                can access any features.
              </p>
            </div>
          )}

          {!userDetails.verified && userDetails.kyc_status === "unverified" && (
            <div className={styles.statusMessage}>
              <div className={styles.statusIcon}>📝</div>
              <h3>Complete KYC Verification</h3>
              <p>
                Please complete your KYC form before you can access any
                features.
              </p>
              <button className={styles.actionButton} onClick={handleKycAction}>
                Complete KYC
              </button>
            </div>
          )}

          {!userDetails.verified && userDetails.kyc_status === "rejected" && (
            <div className={styles.statusMessage}>
              <div className={styles.statusIcon}>❌</div>
              <h3>KYC Verification Rejected</h3>
              <p>
                Your KYC has been rejected. Please review your details or
                contact the admin.
              </p>
              <button className={styles.actionButton} onClick={handleKycAction}>
                Contact Support
              </button>
            </div>
          )}

          {userDetails.verified && (
            <div className={styles.statusMessage}>
              <div className={styles.statusIcon}>✅</div>
              <h3>Verification Successful</h3>
              <p>
                Your account has been verified. You now have full access to all
                features.
              </p>
              <button className={styles.successButton} onClick={handleClose}>
                Continue to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KycStatusModal;
