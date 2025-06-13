import React from 'react';
import styles from './Register.module.css';

const DocumentDetailForm = ({ formData, setFormData, errors, setErrors }) => {
  const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file && file.size > maxFileSize) {
      setErrors((prev) => ({ ...prev, [field]: 'File size exceeds 5MB limit.' }));
      setFormData((prev) => ({ ...prev, [field]: null }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: '' }));
      setFormData((prev) => ({ ...prev, [field]: file }));
    }
  };

  return (
    <div className={styles.formSection}>
      <h3>Document Details</h3>
      <div className={styles.formGrid}>
        <div>
          <label>Nagarikta Number *</label>
          <input
            type="text"
            value={formData.nagarikta_no || ''}
            onChange={(e) => setFormData({ ...formData, nagarikta_no: e.target.value })}
            required
          />
        </div>
        <div>
          <label>PAN Number</label>
          <input
            type="text"
            value={formData.pan_no || ''}
            onChange={(e) => setFormData({ ...formData, pan_no: e.target.value })}
          />
        </div>
        <div>
          <label>Nagarikta Photo *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'nagarikta_photo')}
            required
          />
          {errors.nagarikta_photo && <p className={styles.error}>{errors.nagarikta_photo}</p>}
        </div>
        <div>
          <label>PAN Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'pan_photo')}
          />
          {errors.pan_photo && <p className={styles.error}>{errors.pan_photo}</p>}
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailForm;