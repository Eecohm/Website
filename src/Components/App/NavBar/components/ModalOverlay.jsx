import React from "react";
import styles from "@/Components/App/NavBar/NavBar.module.css";

const ModalOverlay = ({ children }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>{children}</div>
    </div>
  );
};

export default ModalOverlay;
