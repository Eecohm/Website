import React from "react";
import styles from "./VerificationWarningModal.module.css";

const VerificationWarningModal = ({ message, onConfirm }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.iconContainer}>
                    <span className={styles.icon}>⚠️</span>
                </div>
                <h3 className={styles.title}>Verification Required</h3>
                <p className={styles.message}>{message}</p>
                <button className={styles.confirmButton} onClick={onConfirm}>
                    OK
                </button>
            </div>
        </div>
    );
};

export default VerificationWarningModal;
