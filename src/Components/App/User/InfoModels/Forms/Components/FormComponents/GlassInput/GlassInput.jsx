import React, { useEffect, useState, useRef } from "react";
import styles from "./GlassInput.module.css";

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
  onValidate,
}) => {
  const [error, setError] = useState("");
  const hasInitialValidated = useRef(false);

  const handleBlur = (e) => {
    if (validate) {
      const validationError = validate(e.target.value);
      setError(validationError || "");

      if (onValidate) {
        console.log(
          `${name} handleBlur - value: "${
            e.target.value
          }", validationError: "${validationError}", isValid: ${!validationError}`
        );
        onValidate(name, !validationError);
      }
    }
  };

  // Initial validation only once when component mounts
  useEffect(() => {
    if (onValidate && !hasInitialValidated.current) {
      hasInitialValidated.current = true;

      // Use setTimeout to defer validation until after render is complete
      setTimeout(() => {
        if (validate) {
          if (value) {
            const validationError = validate(value);
            onValidate(name, !validationError);
          } else if (required) {
            onValidate(name, false);
          } else {
            onValidate(name, true);
          }
        } else {
          if (required) {
            const isValid = value && value.trim() !== "";
            onValidate(name, isValid);
          } else {
            onValidate(name, true);
          }
        }
      }, 0);
    }
  }, []);

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
          if (error) setError("");
        }}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        required={required}
      />

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default GlassInput;
