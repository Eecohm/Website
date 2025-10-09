import React, { useEffect, useRef } from "react";
import styles from "./GlassSelect.module.css";

const GlassSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  onValidate,
}) => {
  const hasInitialValidated = useRef(false);

  const handleChange = (e) => {
    onChange(e);

    if (onValidate) {
      const isValid = required ? e.target.value.trim() !== "" : true;
      onValidate(name, isValid);
    }
  };

  // Initial validation only once when component mounts
  useEffect(() => {
    if (onValidate && !hasInitialValidated.current) {
      hasInitialValidated.current = true;

      // Use setTimeout to defer validation until after render is complete
      setTimeout(() => {
        if (required) {
          const isValid = value && value.trim() !== "";
          onValidate(name, isValid);
        } else {
          // Optional field is always valid
          onValidate(name, true);
        }
      }, 0);
    }
  }, []); // Empty dependency array to run only once
  return (
    <div className={styles.selectContainer}>
      <label className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className={styles.select}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GlassSelect;
