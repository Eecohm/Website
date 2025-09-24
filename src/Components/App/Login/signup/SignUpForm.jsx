//main stateful comp that manages data,validation,api calls and passes props into signinform

import React, { useState } from "react";
import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import SignInForm from "./SignInForm";
import { validateForm } from "./Validator";
import { registerUser, verifyOtp } from "./api";

const roleOptions = [
  { value: "", label: "Select a role" },
  { value: "student", label: "Student" },
  { value: "teacher", label: "Teacher" },
  { value: "employee", label: "Employee" },
  { value: "guardian", label: "Guardian" },
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
  }); //stores all user input
  const [errors, setErrors] = useState({}); //stores validation and api errors
  const [isOtpSent, setIsOtpSent] = useState(false); //tracks if otp is sent
  const [isLoading, setIsLoading] = useState(false); //used to disable the button and show loading while waiting for api
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    //name:email, pw, otp
    //value:user input
    const { name, value } = e.target;

    //dynamically updates just the field that changed
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", api: "" }));
  };

  //generic function to handle api calls, success message and error handling
  const handleApi = async (apiCall, successMsg, reset = false) => {
    try {
      const res = await apiCall();
      const data = await res.json();
      if (!res.ok) throw data;
      if (reset)
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
          otp: "",
        });
      alert(successMsg);
      return true;
    } catch (err) {
      setErrors({
        api: err?.message || err?.otp || err?.email || "Network error",
      });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //to let react handle the process without refreshing instead of a html form default reloads.
    if (isLoading) return;
    setIsLoading(true);

    const validationErrors = validateForm(formData, isOtpSent);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    const success = !isOtpSent
      ? await handleApi(
          () => registerUser(baseUrl, formData),
          "OTP sent to your email!"
        )
      : await handleApi(
          () => verifyOtp(baseUrl, formData),
          "Registration successful!",
          true
        );

    if (success && isOtpSent) navigate("/dashboard");
    if (!isOtpSent && success) setIsOtpSent(true);

    setIsLoading(false);
  };

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
    </div>
  );
};

export default SignUpForm;
