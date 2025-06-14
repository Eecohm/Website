import React from 'react';
import styles from './Register.module.css';

const ContactDetailForm = ({ formData = {}, setFormData, errors = {}, setErrors, validateContact }) => {
  const handleChange = (e, field) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validateContact(value, field) }));
  };

  const handleBlur = (e, field) => {
    setErrors((prev) => ({ ...prev, [field]: validateContact(e.target.value, field) }));
  };

  return (
    <div className={styles.formSection}>
      <h3>Contact Details</h3>
      <div className={styles.formGrid}>
        <div>
          <label htmlFor="phone">Phone <span className={styles.required}>*</span></label>
          <input
            id="phone"
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => handleChange(e, 'phone')}
            onBlur={(e) => handleBlur(e, 'phone')}
            className={errors.phone ? styles.errorInput : ''}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            required
          />
          {errors.phone && (
            <p id="phone-error" className={styles.error}>{errors.phone}</p>
          )}
        </div>
        <div>
          <label htmlFor="alternate_phone">Alternate Phone</label>
          <input
            id="alternate_phone"
            type="tel"
            value={formData.alternate_phone || ''}
            onChange={(e) => handleChange(e, 'alternate_phone')}
            onBlur={(e) => handleBlur(e, 'alternate_phone')}
            className={errors.alternate_phone ? styles.errorInput : ''}
            aria-invalid={!!errors.alternate_phone}
            aria-describedby={errors.alternate_phone ? 'alternate_phone-error' : undefined}
          />
          {errors.alternate_phone && (
            <p id="alternate_phone-error" className={styles.error}>{errors.alternate_phone}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactDetailForm;