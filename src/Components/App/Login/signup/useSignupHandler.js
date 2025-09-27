// useSignUpHandler.js
import { validateForm } from "./Validator";
import { registerUser, verifyOtp } from "./api";

export const useSignUpHandler = ({
  formData,
  isOtpSent,
  isLoading,
  setIsLoading,
  setIsOtpSent,
  setFormData,
  setErrors,
  showModal,
  baseUrl,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    const validationErrors = validateForm(formData, isOtpSent);

    if (Object.keys(validationErrors).length) {
      const errorMessages = Object.values(validationErrors).join(". ");
      showModal("error", "Please Fix These Issues", errorMessages);
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    // For OTP sending (first step)
    if (!isOtpSent) {
      try {
        const response = await registerUser(baseUrl, formData);
        const data = await response.json();

        if (!response.ok) throw data;

        showModal(
          "success",
          "OTP Sent Successfully!",
          "Please check your email for the OTP code."
        );
        setIsOtpSent(true);
      } catch (error) {
        const errorMessage =
          error?.message ||
          error?.email ||
          error?.error ||
          (error?.status === 404 ? "Email address not found" : null) ||
          (error?.status === 422 ? "Invalid email format" : null) ||
          "Failed to send OTP. Please check your email address.";

        showModal("error", "Failed to Send OTP", errorMessage);
      }
    }
    // For OTP verification (second step)
    else {
      try {
        const response = await verifyOtp(baseUrl, formData);
        const data = await response.json();

        if (!response.ok) throw data;

        showModal(
          "success",
          "Registration Successful!",
          "Your account has been created successfully. You will be redirected to dashboard."
        );
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
          otp: "",
        });
      } catch (error) {
        showModal(
          "error",
          "Verification Failed",
          error?.message || "Invalid OTP."
        );
      }
    }
    setIsLoading(false);
  };

  return { handleSubmit };
};
