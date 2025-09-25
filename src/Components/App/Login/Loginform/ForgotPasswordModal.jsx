import React from "react";
import styles from "./Login.module.css";

const ForgotPasswordModal = ({
  forgotEmail,
  setForgotEmail,
  otp,
  setOtp,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  resetError,
  handleForgotPassword,
  handleVerifyOtp,
  resetForgotPasswordModal,
  resetStep,
}) => (
  <div className={styles.modalOverlay}>
    <div className={styles.modalBox}>
      <h3>Reset Password</h3>
      {resetStep === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            className={styles.neonInput}
          />
          <button className={styles.neonButton} onClick={handleForgotPassword}>
            Send OTP
          </button>
        </>
      )}
      {resetStep === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={styles.neonInput}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.neonInput}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.neonInput}
          />
          <button className={styles.neonButton} onClick={handleVerifyOtp}>
            Reset Password
          </button>
        </>
      )}
      {resetError && <p className={styles.errorMessage}>{resetError}</p>}
      <button
        className={styles.cancelButton}
        onClick={resetForgotPasswordModal}
      >
        Cancel
      </button>
    </div>
  </div>
);

export default ForgotPasswordModal;
