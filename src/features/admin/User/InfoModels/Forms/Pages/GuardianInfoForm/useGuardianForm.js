import { useCallback, useEffect, useState } from "react";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import { submitGuardianInfo } from "@/hooks/GuardianApi/guardianInfoApi";
import { useGuardianInfoSubmission } from "@/hooks/GuardianApi/useGuardianInfoSubmission";

const initialFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  photo: null,
  country: "",
  province: "",
  municipality: "",
  ward: "",
  tole: "",
  pinPoint: "",
  tellPhone: "",
  phone: "",
  alternatePhone: "",
  contactPerson: "",
  userId: "",
  userEmail: "",
  studentIds: "",
};

export default function useGuardianForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [modalNotification, setModalNotification] = useState(null);
  const [EditDetial, SetEditDetial] = useState(false);

  const [sectionValidations, setSectionValidations] = useState({
    personalDetails: { isValid: false, errors: {} },
    addressDetails: { isValid: false, errors: {} },
    contactDetails: { isValid: false, errors: {} },
    guardianDetails: { isValid: false, errors: {} },
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const { isSubmitting } = useGuardianInfoSubmission();

  const baseUrl = useBaseUrl();
  const { login, setToken } = useAuth();

  useEffect(() => {
    const allSectionsValid = Object.values(sectionValidations).every(
      (section) => section.isValid
    );
    setIsFormValid(allSectionsValid);
  }, [
    sectionValidations.personalDetails.isValid,
    sectionValidations.addressDetails.isValid,
    sectionValidations.contactDetails.isValid,
    sectionValidations.guardianDetails.isValid,
  ]);

  const updateSectionValidation = useCallback(
    (sectionName, isValid, errors = {}) => {
      setSectionValidations((prev) => ({
        ...prev,
        [sectionName]: { isValid, errors },
      }));
    },
    []
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!isFormValid) {
        setModalNotification({
          type: "warning",
          message: "Please fix all validation errors before submitting.",
        });
        return;
      }

      try {
        const method = EditDetial ? "PUT" : "POST";

        const toSend = { ...formData };

        toSend.userId = null;
        toSend.studentIds = "";
        toSend.userEmail = "";

        const result = await submitGuardianInfo(
          toSend,
          baseUrl,
          login,
          setToken,
          method
        );

        if (result.success) {
          setModalNotification({
            type: "pending",
            message:
              "Application Status: PENDING - Your owner information is being reviewed. You will be notified once verification is complete.",
          });
        } else {
          setModalNotification({
            type: "error",
            message: `Submission failed: ${result.error}`,
          });
          console.error("❌ Submission error:", result.error);
        }
      } catch (error) {
        setModalNotification({
          type: "error",
          message:
            "❌ An unexpected error occurred during submission. Please try again later.",
        });
      }
    },
    [EditDetial, baseUrl, formData, isFormValid, login, setToken]
  );

  return {
    formData,
    setFormData,
    modalNotification,
    setModalNotification,
    EditDetial,
    SetEditDetial,
    sectionValidations,
    updateSectionValidation,
    handleChange,
    handleFileChange,
    handleSubmit,
    isFormValid,
    isSubmitting,
  };
}
