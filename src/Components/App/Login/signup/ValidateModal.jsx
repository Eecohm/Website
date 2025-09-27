import React from "react";
import styles from "./ValidateModal.module.css";

const ValidateModal = ({ isOpen, onClose, type, message, title }) => {
  if (!isOpen) return null;

  // Close modal when clicking overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={`${styles.modalHeader} ${styles[type]}`}>
          <h3>{title}</h3>
        </div>
        <div className={styles.modalBody}>
          <p className={styles.message}>{message}</p>
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.primaryButton}>
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidateModal;

//email doesnt exist modal
