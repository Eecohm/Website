import React from "react";
import styles from "./Login.module.css";

const LoginInput = ({ label, name, value, onChange, disabled, error }) => (
  <div className={styles.inputGroup}>
    <label>{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={error ? styles.inputError : styles.neonInput}
      required
    />
  </div>
);

export default LoginInput;
