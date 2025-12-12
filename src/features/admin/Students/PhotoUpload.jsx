import React from "react";
import styles from "@/features/admin/Students/Students.module.css";
import { FiUpload, FiX } from "react-icons/fi";

const PhotoUpload = ({ photo, photoPreview, onChange, onRemove, error }) => {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let errorMsg = "";
    let preview = "";

    // Only PNG allowed
    if (file.type !== "image/png") {
      errorMsg = "Only PNG images are allowed";
    }
    // Size limit 2MB
    else if (file.size > 2 * 1024 * 1024) {
      errorMsg = "File size must be less than 2MB";
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        preview = reader.result;
        onChange(file, preview, ""); // send back file & preview
      };
      reader.readAsDataURL(file);
      return;
    }

    // If invalid → clear file and send error
    onChange(null, "", errorMsg);
  };

  return (
    <div className={`${styles.fieldGroup} ${styles.photoUpload}`}>
      <label>Passport Size Photo *</label>
      <div className={styles.photoContainer}>
        {photoPreview ? (
          <div className={styles.photoPreview}>
            <img src={photoPreview} alt="Preview" />
            <button
              type="button"
              onClick={onRemove}
              className={styles.removePhoto}
            >
              <FiX />
            </button>
          </div>
        ) : (
          <label className={styles.uploadArea}>
            <FiUpload className={styles.uploadIcon} />
            <span>Click to upload PNG photo (max 2MB)</span>
            <input
              type="file"
              accept="image/png"
              onChange={handleFile}
              style={{ display: "none" }}
            />
          </label>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default PhotoUpload;
