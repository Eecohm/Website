import React from "react";
import styles from "./Login.module.css";

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  show,
  toggle,
  disabled,
  error,
}) => (
  <div className={styles.inputGroup}>
    <label>{label}</label>
    <div className={styles.passwordWrapper}>
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={error ? styles.inputError : styles.neonInput}
        required
      />
      <button type="button" onClick={toggle} disabled={disabled}>
        {show ? "Hide" : "Show"}
      </button>
    </div>
  </div>
);

export default PasswordInput;
