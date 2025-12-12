import React from "react";
import styles from "@/features/admin/NavBar/NavBar.module.css";

const Backdrop = ({ visible, onClose }) => {
  if (!visible) return null;

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleClose}
      onTouchEnd={handleClose}
      role="presentation"
    />
  );
};

export default Backdrop;
