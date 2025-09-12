import styles from "./KycStatusModal.module.css";

const KycStatusModal = ({ verified, kycStatus, onClose }) => {
  let content = null;

  if (!verified) {
    content = {
      title: "Account Not Verified",
      message:
        "Your account is not verified. Please verify your account to access all features.",
    };
  } else if (kycStatus === "pending") {
    content = {
      title: "KYC Pending",
      message:
        "Your KYC status is pending. Please wait for its approval before you can access any features.",
    };
  } else if (kycStatus === "unverified") {
    content = {
      title: "KYC Required",
      message:
        "Please complete your KYC form before you can access any features.",
    };
  } else if (kycStatus === "rejected") {
    content = {
      title: "KYC Rejected",
      message:
        "Your KYC has been rejected. Please review your details or contact the admin.",
    };
  }

  if (!content) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{content.title}</h2>
        <p>{content.message}</p>
        {kycStatus === "unverified" && (
          <button onClick={() => alert("Navigate to KYC Form")}>
            Complete KYC
          </button>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default KycStatusModal;
