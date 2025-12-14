//main stateful comp that manages data,validation,api calls and passes props into signinform
import React, { useState, useCallback } from "react";
import styles from "@/features/admin/Login/signup/Signup.module.css";
import { useNavigate } from "react-router-dom";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import SignInForm from "@/features/admin/Login/signup/SignInForm";
import ValidateModal from "@/features/admin/Login/signup/ValidateModal";
import { useSignUpHandler } from "@/features/admin/Login/signup/useSignupHandler";

const roleOptions = [
  { value: "", label: "Select a role" },
  { value: "student", label: "Student", disabled: true },
  { value: "teacher", label: "Teacher", disabled: true },
  { value: "employee", label: "Employee" },
  { value: "guardian", label: "Guardian", disabled: true },
  { value: "owner", label: "Owner" },
];

const SignUpForm = () => {
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    otp: "",
  });
  const [errors, setErrors] = useState({});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "",
    title: "",
    message: "",
  });

  const showModal = (type, title, message) => {
    setModalConfig({
      isOpen: true,
      type,
      title,
      message,
    });
  };

  const closeModal = () => {
    const wasSuccess = modalConfig.type === "success" && modalConfig.isOpen;
    setModalConfig({
      ...modalConfig,
      isOpen: false,
    });
    if (wasSuccess && modalConfig.title === "Registration Successful!") {
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", api: "" }));
  };

  const { handleSubmit } = useSignUpHandler({
    formData,
    isOtpSent,
    isLoading,
    setIsLoading,
    setIsOtpSent,
    setFormData,
    setErrors,
    showModal,
    baseUrl,
  });

  return (
    <div className={styles.signUpContainer}>
      <SignInForm
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        errors={errors}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        roleOptions={roleOptions}
        isOtpSent={isOtpSent}
        isLoading={isLoading}
      />

      <ValidateModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
      />
    </div>
  );
};

export default SignUpForm;
