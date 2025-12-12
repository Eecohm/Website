import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "@/features/admin/Login/Login/Login.module.css";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import LoginFormComponent from "@/features/admin/Login/Login/components/LoginFormComponent";
import PasswordComponent from "@/features/admin/Login/Login/components/PasswordComponent";
import {
  loginUser,
  handleForgotPassword,
  handleVerifyOtpAndSetPassword,
} from "@/features/admin/Login/Login/api/loginApi";

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

  useEffect(() => {
    const checkSavedLogin = async () => {
      if (isAuthenticated()) {
        navigate("/dashboard");
      }
      setIsCheckingSavedLogin(false);
    };
    checkSavedLogin();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setError("");
    setIsLoading(true);

    try {
      const data = await loginUser(email, password, baseUrl);
      login(data, rememberMe);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      if (error.message === "Failed to fetch") {
        setError("Network error. Please check your internet connection.");
      } else if (error.status === 401) {
        setError("Invalid email or password.");
      } else if (error.status >= 500) {
        setError("Server error. Please try again later.");
      } else {
        setError(error.message || "Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => navigate("/");

  //handle forgot password
  const handleForgotPasswordWrapper = () => {
    handleForgotPassword(
      forgotEmail, // Pass the email
      baseUrl, // Pass baseUrl
      setResetError, // Pass state setter
      setResetStep // Pass state setter
    );
  };

  //otp verify and set new password
  const handleVerifyOtpAndSetPasswordWrapper = () => {
    handleVerifyOtpAndSetPassword(
      otp,
      newPassword,
      confirmPassword,
      forgotEmail,
      baseUrl,
      setResetError,
      login,
      navigate,
      rememberMe,
      setShowForgotModal
    );
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
        <LoginFormComponent
          handleSubmit={handleSubmit}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          isLoading={isLoading}
          error={error}
          setShowForgotModal={setShowForgotModal}
        />
      </div>
      {showForgotModal && (
        <PasswordComponent
          setShowForgotModal={setShowForgotModal}
          forgotEmail={forgotEmail}
          setForgotEmail={setForgotEmail}
          resetForgotPasswordModal={resetForgotPasswordModal}
          otp={otp}
          setOtp={setOtp}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          resetError={resetError}
          handleVerifyOtpAndSetPassword={handleVerifyOtpAndSetPasswordWrapper}
          resetStep={resetStep}
          setResetStep={setResetStep}
          setResetError={setResetError}
          isLoading={isLoading}
          handleForgotPassword={handleForgotPasswordWrapper}
        />
      )}
    </div>
  );
};

export default LoginForm;
