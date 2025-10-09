import React, { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import styles from "./GlassFileUpload.module.css";

const GlassFileUpload = ({
  label,
  name,
  onChange,
  accept = "image/*",
  required = false,
  onValidate,
}) => {
  const [fileName, setFileName] = useState("");
  const [hasFile, setHasFile] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setHasFile(true);
      onChange(e);

      if (onValidate) {
        onValidate(name, true);
      }
    } else {
      setFileName("");
      setHasFile(false);

      if (onValidate) {
        const isValid = !required;
        onValidate(name, isValid);
      }
    }
  };

  // Initial validation only on mount and when required changes
  useEffect(() => {
    if (onValidate && required) {
      onValidate(name, false); // Initially invalid for required file uploads
    }
  }, [required]); // Remove hasFile and onValidate from dependencies

  return (
    <div className={styles.uploadContainer}>
      <label className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <div>
        <input
          type="file"
          name={name}
          onChange={handleChange}
          accept={accept}
          className={styles.fileInput}
          id={name}
        />
        <label htmlFor={name} className={styles.uploadLabel}>
          <Upload className={styles.icon} size={18} />
          <span className={styles.fileName}>
            {fileName || "Choose file..."}
          </span>
        </label>
      </div>
    </div>
  );
};

export default GlassFileUpload;
