import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import styles from './GlassFileUpload.module.css';

const GlassFileUpload = ({ 
  label, 
  name, 
  onChange, 
  accept = "image/*", 
  required = false 
}) => {
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onChange(e);
    }
  };

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
          <span className={styles.fileName}>{fileName || 'Choose file...'}</span>
        </label>
      </div>
    </div>
  );
};

export default GlassFileUpload;
