import React from "react";
import { X } from "lucide-react";
import styles from "@/Components/App/User/InfoModels/Details/Pages/OwnerDetail/components/ImageModal.module.css";

export const ImageModal = ({ show, url, onClose }) => {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalCloseButton} onClick={onClose}>
          <X size={32} />
        </button>
        <img src={url} alt="Document" className={styles.modalImage} />
      </div>
    </div>
  );
};
