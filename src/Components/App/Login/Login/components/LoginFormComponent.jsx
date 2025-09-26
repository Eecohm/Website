import React from "react";
import styles from "../Login.module.css";

const LoginFormComponent = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  isLoading,
  error,
  setShowForgotModal,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={error ? styles.inputError : styles.neonInput}
            required
            disabled={isLoading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error ? styles.inputError : styles.neonInput}
            required
            disabled={isLoading}
          />
        </div>
        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            />
            Show Password
          </label>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              disabled={isLoading}
            />
            Remember Me
          </label>
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <button
          type="submit"
          className={`${styles.loginButton} ${styles.neonButton}`}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <button
          type="button"
          className={styles.forgotPassword}
          onClick={() => setShowForgotModal(true)}
          disabled={isLoading}
        >
          Forgot Password?
        </button>
      </form>
    </div>
  );
};
export default LoginFormComponent;
