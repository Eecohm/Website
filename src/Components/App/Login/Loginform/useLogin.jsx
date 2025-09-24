// useLogin.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { getCookie, setCookie, deleteCookie } from "./cookieUtils";
import { loginUserApi, forgotPasswordApi, verifyOtpApi } from "./api";
import { useBaseUrl } from "@/Context/BaseUrlContext";

export const useLogin = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const baseUrl = useBaseUrl();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSavedLogin, setIsCheckingSavedLogin] = useState(true);

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetStep, setResetStep] = useState(1);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
      return;
    }
    const savedEmail = getCookie("savedEmail");
    const savedPassword = getCookie("savedPassword");
    const savedRememberMe = getCookie("rememberMe") === "true";
    if (savedEmail && savedPassword && savedRememberMe) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
      handleLogin(savedEmail, savedPassword, true);
    } else setIsCheckingSavedLogin(false);
  }, []);

  const handleLogin = async (loginEmail, loginPassword, auto = false) => {
    setError("");
    if (!auto) setIsLoading(true);
    try {
      const data = await loginUserApi(baseUrl, loginEmail, loginPassword);
      login(data);

      if (rememberMe) {
        setCookie("savedEmail", loginEmail, 30);
        setCookie("savedPassword", loginPassword, 30);
        setCookie("rememberMe", "true", 30);
      } else {
        deleteCookie("savedEmail");
        deleteCookie("savedPassword");
        deleteCookie("rememberMe");
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials");
      if (auto) {
        deleteCookie("savedEmail");
        deleteCookie("savedPassword");
        deleteCookie("rememberMe");
        setEmail("");
        setPassword("");
        setRememberMe(false);
      }
    } finally {
      setIsLoading(false);
      setIsCheckingSavedLogin(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    handleLogin(email, password);
  };

  const toggleShowPassword = () => setShowPassword((s) => !s);
  const toggleRememberMe = () => setRememberMe((s) => !s);
  const handleClose = () => navigate("/");

  const forgotProps = {
    forgotEmail,
    setForgotEmail,
    otp,
    setOtp,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    resetError,
    setResetError,
    resetStep,
    setResetStep,
    setShowForgotModal,

    handleForgotPassword: async () => {
      setResetError("");
      if (!forgotEmail) return setResetError("Please enter email");
      try {
        await forgotPasswordApi(forgotEmail, baseUrl);
        setResetStep(2);
      } catch (err) {
        setResetError(err.message);
      }
    },

    handleVerifyOtp: async () => {
      setResetError("");
      if (!otp || !newPassword || !confirmPassword)
        return setResetError("Fill all fields");
      if (newPassword !== confirmPassword)
        return setResetError("Passwords don't match");
      try {
        const data = await verifyOtpApi(forgotEmail, otp, baseUrl, newPassword);
        login(data);
        setShowForgotModal(false);
        navigate("/dashboard");
      } catch (err) {
        setResetError(err.message);
      }
    },
    resetForgotPasswordModal: () => {
      setForgotEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setResetError("");
      setResetStep(1);
      setShowForgotModal(false);
    },
    isCheckingSavedLogin,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  return {
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
  };
};
