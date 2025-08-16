import React from "react";
import styles from "./ModalNotification.module.css";

const icons = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
  help: "❓",
};

const ModalNotification = ({ type = "info", message, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${styles[type]}`}>
        <div className={styles.header}>
          <span className={styles.icon}>{icons[type]}</span>
          <h3 className={styles.title}>{type.toUpperCase()}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.body}>{message}</div>
      </div>
    </div>
  );
};

export default ModalNotification;
