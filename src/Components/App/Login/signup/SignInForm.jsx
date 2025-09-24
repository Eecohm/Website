//ui part of signup form
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

const PasswordInput = ({
  name,
  value,
  onChange,
  show,
  toggle,
  placeholder,
  error,
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={name}>{placeholder}</label>
    <div className={styles.passwordWrapper}>
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      <button type="button" className={styles.togglePassword} onClick={toggle}>
        {show ? "Hide" : "Show"}
      </button>
    </div>
    {error && (
      <span id={`${name}-error`} className={styles.error}>
        {error}
      </span>
    )}
  </div>
);

const TextInput = ({
  name,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  maxLength,
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={name}>{placeholder}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      required
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && (
      <span id={`${name}-error`} className={styles.error}>
        {error}
      </span>
    )}
  </div>
);

const SignInForm = ({
  handleSubmit,
  formData,
  handleChange,
  errors,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  roleOptions,
  isOtpSent,
  isLoading,
}) => {
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className={styles.signUpForm}>
      <div className={styles.header}>
        <h2>Register</h2>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={() => navigate("/")}
        >
          ✕
        </button>
      </div>

      <TextInput
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        error={errors.email}
        type="email"
      />

      <PasswordInput
        name="password"
        value={formData.password}
        onChange={handleChange}
        show={showPassword}
        toggle={() => setShowPassword((s) => !s)}
        placeholder="Password"
        error={errors.password}
      />

      <PasswordInput
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        show={showConfirmPassword}
        toggle={() => setShowConfirmPassword((s) => !s)}
        placeholder="Confirm Password"
        error={errors.confirmPassword}
      />

      <div className={styles.formGroup}>
        <label htmlFor="role">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          aria-invalid={!!errors.role}
          aria-describedby={errors.role ? "role-error" : undefined}
        >
          {roleOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {errors.role && (
          <span id="role-error" className={styles.error}>
            {errors.role}
          </span>
        )}
      </div>

      {isOtpSent && (
        <TextInput
          name="otp"
          value={formData.otp}
          onChange={handleChange}
          placeholder="OTP"
          error={errors.otp}
          maxLength={6}
        />
      )}

      {errors.api && <span className={styles.error}>{errors.api}</span>}

      <button type="submit" className={styles.submitBtn} disabled={isLoading}>
        {isLoading ? "Loading..." : isOtpSent ? "Verify OTP" : "Send OTP"}
      </button>
    </form>
  );
};

export default SignInForm;
