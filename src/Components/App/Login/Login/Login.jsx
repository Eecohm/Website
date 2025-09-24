import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";

const LoginForm = () => {
  const baseUrl = useBaseUrl();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  
  const [isCheckingSavedLogin, setIsCheckingSavedLogin] = useState(true);

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetStep, setResetStep] = useState(1);

  // Cookie utility functions
  const setCookie = (name, value, days = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
  };

  const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;secure;samesite=strict`;
  };

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated()) {
      navigate("/dashboard");
      return;
    }

    // Check for remembered credentials
    const savedEmail = getCookie("savedEmail");
    const savedPassword = getCookie("savedPassword");
    const savedRememberMe = getCookie("rememberMe") === "true";

    if (savedEmail && savedPassword && savedRememberMe) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
      // Auto-login with saved credentials
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
        credentials: "include", // This ensures cookies are sent/received
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Use AuthContext login method which handles cookie storage
        login(data);
        
        // Handle remember me functionality
        if (rememberMe) {
          setCookie("savedEmail", loginEmail, 30); // Remember for 30 days
          setCookie("savedPassword", loginPassword, 30);
          setCookie("rememberMe", "true", 30);
        } else {
          // Clear remembered credentials
          deleteCookie("savedEmail");
          deleteCookie("savedPassword");
          deleteCookie("rememberMe");
        }
        
        setIsCheckingSavedLogin(false);
        navigate("/dashboard");
        return;
      } else if ([401, 403].includes(response.status)) {
        setError("Invalid credentials");
        // Clear saved credentials if they're invalid
        if (auto) {
          deleteCookie("savedEmail");
          deleteCookie("savedPassword");
          deleteCookie("rememberMe");
          setEmail("");
          setPassword("");
          setRememberMe(false);
        }
      } else {
        setError("An error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
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

    loginUser(email, password);
  };

  const handleClose = () => navigate("/");

  const handleForgotPassword = async () => {
    setResetError("");
    
    if (!forgotEmail) {
      setResetError("Please enter your email");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/user/forgot-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      
      if (res.ok) {
        setResetStep(2);
        setResetError("");
      } else {
        const errorData = await res.json();
        setResetError(errorData.message || "Email not found");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setResetError("Error sending email. Please try again.");
    }
  };

  const handleVerifyOtpAndSetPassword = async () => {
    if (!otp || !newPassword || !confirmPassword) {
      setResetError("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetError("Passwords don't match");
      return;
    }

    if (newPassword.length < 6) {
      setResetError("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/user/otp-verify/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: forgotEmail,
          otp: otp,
          new_password: newPassword,
        }),
      });
      
      if (res.ok) {
        const data = await res.json();
        
        // Use AuthContext login method
        login(data);
        
        // Close modal and redirect
        setShowForgotModal(false);
        navigate("/dashboard");
      } else {
        const errorData = await res.json();
        setResetError(errorData.message || "Reset failed. Please try again.");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setResetError("Server error. Please try again.");
    }
  };

  const resetForgotPasswordModal = () => {
    setShowForgotModal(false);
    setForgotEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setResetError("");
    setResetStep(1);
  };

  if (isCheckingSavedLogin) {
    return <div className={styles.loadingScreen}>Checking saved login...</div>;
  }

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
      )}
    </div>
  );
};

export default LoginForm;