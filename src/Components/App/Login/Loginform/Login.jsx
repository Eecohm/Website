// Login.jsx
import React from "react";
import styles from "./Login.module.css";
import { useLogin } from "./useLogin";
import LoginInput from "./LoginInput";
import PasswordInput from "./PasswordInput";
import ForgotPasswordModal from "./ForgotPasswordModal";

const LoginForm = () => {
  const {
    email,
    password,
    showPassword,
    rememberMe,
    isLoading,
    error,
    showForgotModal,
    setShowForgotModal,
    handleChange,
    toggleShowPassword,
    toggleRememberMe,
    handleSubmit,
    forgotProps,
    handleClose,
  } = useLogin();

  if (forgotProps.isCheckingSavedLogin)
    return <div className={styles.loadingScreen}>Checking saved login...</div>;

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <button className={styles.homebutton} onClick={handleClose}>
          ✕
        </button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <LoginInput
            label="Email"
            name="email"
            value={email}
            onChange={handleChange}
            disabled={isLoading}
            error={error}
          />
          <PasswordInput
            label="Password"
            name="password"
            value={password}
            onChange={handleChange}
            show={showPassword}
            toggle={toggleShowPassword}
            disabled={isLoading}
            error={error}
          />
          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={toggleShowPassword}
                disabled={isLoading}
              />
              Show Password
            </label>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={toggleRememberMe}
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

      {showForgotModal && <ForgotPasswordModal {...forgotProps} />}
    </div>
  );
};

export default LoginForm;
