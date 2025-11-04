// src/hooks/useEmployeeInfoSubmission.js
import { useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { submitEmployeeInfo } from "@/hooks/EmployeeApi/employeeInfoApi";

export const useEmployeeInfoSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { login, setToken } = useAuth();
  const baseUrl = useBaseUrl();

  const submitForm = async (formState, method = "POST") => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const result = await submitEmployeeInfo(
        formState,
        baseUrl,
        login,
        setToken,
        method
      );

      if (result && result.success) {
        setSubmitSuccess(true);
        return { success: true, data: result.data };
      } else {
        const message = result?.error || "Submission failed";
        setSubmitError(message);
        return { success: false, error: message, data: result?.data };
      }
    } catch (err) {
      console.error("useEmployeeInfoSubmission caught:", err);
      const message = "Network error. Please check your connection.";
      setSubmitError(message);
      return { success: false, error: message };
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  return {
    isSubmitting,
    submitError,
    submitSuccess,
    submitForm,
    reset,
  };
};
