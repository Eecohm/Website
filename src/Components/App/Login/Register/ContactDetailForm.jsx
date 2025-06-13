import React from 'react';
import styles from './Register.module.css';

const ContactDetailForm = ({ formData = {}, setFormData, errors = {}, setErrors, validateContact }) => (
  <div className={styles.formSection}>
    <h3>Contact Details</h3>
    <div className={styles.formGrid}>
      <div>
        <label>Phone *</label>
        <input
          type="text"
          value={formData.phone || ''}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, phone: e.target.value }));
            setErrors((prev) => ({ ...prev, phone: validateContact(e.target.value, 'phone') }));
          }}
          className={errors.phone ? styles.errorInput : ''}
          required
        />
        {errors.phone && <p className={styles.error}>{errors.phone}</p>}
      </div>
      <div>
        <label>Alternate Phone</label>
        <input
          type="text"
          value={formData.alternate_phone || ''}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, alternate_phone: e.target.value }));
            setErrors((prev) => ({ ...prev, alternate_phone: validateContact(e.target.value, 'alternate_phone') }));
          }}
          className={errors.alternate_phone ? styles.errorInput : ''}
        />
        {errors.alternate_phone && <p className={styles.error}>{errors.alternate_phone}</p>}
      </div>
    </div>
  </div>
);

export default ContactDetailForm;