import { useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { submitOwnerInfo } from "@/services/ownerInfoApi";

export const useOwnerInfoSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { login, token } = useAuth();
  const baseUrl = useBaseUrl();

  const submitForm = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await submitOwnerInfo(
        formData,
        baseUrl,
        login,
        setToken
      );

      if (response.ok) {
        setSubmitSuccess(true);
        return { success: true };
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Submission failed";
        setSubmitError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error("Submission error:", error);
      const errorMessage = "Network error. Please check your connection.";
      setSubmitError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetSubmissionState = () => {
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  return {
    isSubmitting,
    submitError,
    submitSuccess,
    submitForm,
    resetSubmissionState,
  };
};
