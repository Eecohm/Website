import React from "react";
import styles from "./Students.module.css";
import { FiUpload, FiX } from "react-icons/fi";

const PhotoUpload = ({ photo, photoPreview, onChange, onRemove, error }) => {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/"))
      return onChange(null, "", "Please select an image file");
    if (file.size > 2 * 1024 * 1024)
      return onChange(null, "", "Image size should be less than 2MB");

    const reader = new FileReader();
    reader.onload = (ev) => onChange(file, ev.target.result, "");
    reader.readAsDataURL(file);
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
            <span>Click to upload photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              style={{ display: "none" }}
            />
          </label>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
      <div className={styles.photoNote}>
        Please upload a passport-sized photo (max 2MB)
      </div>
    </div>
  );
};

export default PhotoUpload;
