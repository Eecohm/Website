import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "@/Components/App/Login/Login/Login.module.css";

const PasswordComponent = ({
  forgotEmail,
  otp,
  newPassword,
  confirmPassword,
  handleVerifyOtpAndSetPassword,
  handleForgotPassword,
  setForgotEmail,
  setOtp,
  setNewPassword,
  setConfirmPassword,
  resetStep,
  resetError,
  resetForgotPasswordModal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleForgotPasswordClick = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await handleForgotPassword();
    } catch (error) {
      console.error("Forgot password failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
            <button
              className={styles.neonButton}
              onClick={handleForgotPasswordClick}
              disabled={isLoading}
            >
              {isLoading ? "Sending OTP" : "Send OTP"}
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

            {/* New Password Field */}
            <div className={styles.passwordWrapper}>
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.neonInput}
              />
              <div className={styles.showHideButton}>
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  aria-label={
                    showNewPassword ? "Hide password" : "Show password"
                  }
                >
                  <FontAwesomeIcon
                    icon={showNewPassword ? faEye : faEyeSlash}
                  />
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.neonInput}
              />
              <div className={styles.showHideButton}>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEye : faEyeSlash}
                  />
                </button>
              </div>
            </div>

            <button
              className={styles.neonButton}
              onClick={handleVerifyOtpAndSetPassword}
            >
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
};

export default PasswordComponent;
