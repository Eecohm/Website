import React, { useEffect, useState, useRef } from "react";
import styles from "@/Components/App/User/InfoModels/Forms/Components/FormComponents/GlassInput/GlassInput.module.css";

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
  error: externalError,
  ...rest
}) => {
  // const [error, setError] = useState("");
  const hasInitialValidated = useRef(false);

  const [internalError, setInternalError] = useState("");

  // Use external error if provided, otherwise use internal error
  const displayError = externalError || internalError;

  const handleBlur = (e) => {
    if (validate) {
      const validationError = validate(e.target.value);
      setInternalError(validationError || "");

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

  // Initial validation and re-validate when value changes
  useEffect(() => {
    if (onValidate) {
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
            console.log(
              `🔧 GlassInput ${name} - value: "${value}", isValid: ${isValid}`
            );
            onValidate(name, isValid);
          } else {
            onValidate(name, true);
          }
        }
      }, 0);
    }
  }, [value, required, name]); // Re-run when value changes

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={(e) => {
          onChange(e);
          if (displayError) setInternalError("");
        }}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`${styles.input} ${displayError ? styles.inputError : ""}`}
        required={required}
        {...rest}
      />

      {displayError && <span className={styles.errorText}>{displayError}</span>}
    </div>
  );
};

export default GlassInput;
