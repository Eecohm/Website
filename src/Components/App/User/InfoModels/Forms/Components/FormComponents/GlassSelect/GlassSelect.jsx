import React from 'react';
import styles from './GlassSelect.module.css';

const GlassSelect = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  required = false 
}) => (
  <div className={styles.selectContainer}>
    <label className={styles.label}>
      {label} {required && <span className={styles.required}>*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={styles.select}
    >
      <option value="">Select...</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default GlassSelect;