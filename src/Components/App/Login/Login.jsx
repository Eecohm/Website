// LoginForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useBaseUrl } from "../../../BaseUrlContext";

const LoginForm = () => {
  const baseUrl = useBaseUrl();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSavedLogin, setIsCheckingSavedLogin] = useState(true);

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetStep, setResetStep] = useState(1);

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedEmail && savedPassword && savedRememberMe) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
      loginUser(savedEmail, savedPassword, true);
    } else {
      setIsCheckingSavedLogin(false);
    }
  }, []);

  const loginUser = async (loginEmail, loginPassword, auto = false) => {
    setError("");
    if (!auto) setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/user/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("userId", data.user_id);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("role", data.role);
        localStorage.setItem("verified", data.verified);
        localStorage.setItem("kyc_status", data.kyc_status);

        setIsCheckingSavedLogin(false);
        navigate("/dashboard");
        return;
      } else if ([401, 403].includes(response.status)) {
        setError("Invalid credentials");
      } else {
        setError("An error occurred. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
      setIsCheckingSavedLogin(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    setError("");
    setIsLoading(true);

    if (rememberMe) {
      localStorage.setItem("savedEmail", email);
      localStorage.setItem("savedPassword", password);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("savedEmail");
      localStorage.removeItem("savedPassword");
      localStorage.setItem("rememberMe", "false");
    }

    loginUser(email, password);
  };

  const handleClose = () => navigate("/");

  const handleForgotPassword = async () => {
    setResetError("");
    try {
      const res = await fetch(`${baseUrl}/user/forgot-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      if (res.ok) {
        setResetStep(2);
      } else {
        setResetError("Email not found");
      }
    } catch {
      setResetError("Error sending email");
    }
  };

  const handleVerifyOtpAndSetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setResetError("Passwords don't match");
      return;
    }
    try {
      const res = await fetch(`${baseUrl}/user/otp-verify/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: forgotEmail,
          otp,
          new_password: newPassword,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("userId", data.user_id);
        localStorage.setItem("userEmail", data.email);

        setShowForgotModal(false);
        navigate("/dashboard");
      } else {
        const data = await res.json();
        setResetError(data.message || "Reset failed");
      }
    } catch {
      setResetError("Server error");
    }
  };

  if (isCheckingSavedLogin)
    return <div className={styles.loadingScreen}>Checking saved login...</div>;

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <button className={styles.homebutton} onClick={handleClose}>
          ✕
        </button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={error ? styles.inputError : styles.neonInput}
              required
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
            />
          </div>
          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
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
          >
            Forgot Password?
          </button>
        </form>
      </div>

      {showForgotModal && (
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
                  onClick={handleForgotPassword}
                >
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
                <button
                  className={styles.neonButton}
                  onClick={handleVerifyOtpAndSetPassword}
                >
                  Submit
                </button>
              </>
            )}
            {resetError && <p className={styles.errorMessage}>{resetError}</p>}
            <button
              className={styles.cancelButton}
              onClick={() => setShowForgotModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
