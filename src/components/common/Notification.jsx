import React from "react";
import styles from "@/components/common/Notification.module.css";
import {
  XCircle,
  CheckCircle,
  AlertTriangle,
  Info,
  HelpCircle,
} from "lucide-react";

const icons = {
  success: <CheckCircle size={20} />,
  error: <XCircle size={20} />,
  warning: <AlertTriangle size={20} />,
  info: <Info size={20} />,
  help: <HelpCircle size={20} />,
};

const Notification = ({ type = "info", message, onClose }) => {
  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <div className={styles.icon}>{icons[type]}</div>
      <div className={styles.message}>{message}</div>
      {onClose && (
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  );
};

export default Notification;
