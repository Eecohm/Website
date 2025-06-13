import React from 'react';
import styles from './Register.module.css';

const PersonalDetailForm = ({ formData, setFormData, errors, setErrors, validateName }) => {
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
      <h3>Personal Details</h3>
      <div className={styles.formGrid}>
        <div>
          <label>Full Name *</label>
          <input
            type="text"
            value={formData.full_name || ''}
            onChange={(e) => {
              setFormData({ ...formData, full_name: e.target.value });
              setErrors((prev) => ({ ...prev, full_name: validateName(e.target.value, 'full_name') }));
            }}
            className={errors.full_name ? styles.errorInput : ''}
            required
          />
          {errors.full_name && <p className={styles.error}>{errors.full_name}</p>}
        </div>
        <div>
          <label>Date of Birth *</label>
          <input
            type="date"
            value={formData.date_of_birth || ''}
            onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
            className={errors.date_of_birth ? styles.errorInput : ''}
            required
          />
          {errors.date_of_birth && <p className={styles.error}>{errors.date_of_birth}</p>}
        </div>
        <div>
          <label>Gender *</label>
          <select
            value={formData.gender || ''}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className={errors.gender ? styles.errorInput : ''}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className={styles.error}>{errors.gender}</p>}
        </div>
        <div>
          <label>Photo *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'photo')}
            className={errors.photo ? styles.errorInput : ''}
            required
          />
          {errors.photo && <p className={styles.error}>{errors.photo}</p>}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailForm;