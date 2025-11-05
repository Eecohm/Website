import React from "react";
import styles from "../NavBar.module.css";

const Backdrop = ({ visible, onClose }) => {
  if (!visible) return null;
  return <div className={styles.backdrop} onClick={onClose} />;
};

export default Backdrop;
