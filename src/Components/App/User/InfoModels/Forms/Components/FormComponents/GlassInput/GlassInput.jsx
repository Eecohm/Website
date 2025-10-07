import React, { useState } from 'react'; // ✅ import useState
import styles from './GlassInput.module.css';

const GlassInput = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  required = false,
  placeholder,
  disabled = false,
  validate,
  onValidate
}) => {
  const [error, setError] = useState('');

  const handleBlur = (e) => {
    if (validate) {
      const validationError = validate(e.target.value);
      setError(validationError || '');
    }
  };

  if(onValidate) {
    onValidate(name, !validationError);
  }

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e);
          if (error) setError('');
        }}
        onBlur={handleBlur} 
        placeholder={placeholder}
        disabled={disabled}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        required={required}
      />

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default GlassInput;
