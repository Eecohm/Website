import React from 'react';
import styles from './GlassInput.module.css';

const GlassInput = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  required = false, 
  placeholder,
  disabled = false 
}) => (
  <div className={styles.inputContainer}>
    <label className={styles.label}>
      {label} {required && <span className={styles.required}>*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={styles.input}
    />
  </div>
);

export default GlassInput;