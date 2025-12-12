import { useCallback, useEffect, useState } from "react";
import { useEmployeeInfoSubmission } from "@/hooks/EmployeeApi/useEmployeeInfoSubmission";

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
  nagariktaNo: "",
  panNo: "",
  nagariktaPhoto: null,
  panPhoto: null,
  userId: "",
  userEmail: "",
  academicQualification: "",
  jobApplication: null,
  hiringLetter: null,
  resumeCv: null,
};

export default function useEmployeeForm() {
  const [formData, setFormData] = useState(initialFormData);

  // modal notification
  const [modalNotification, setModalNotification] = useState(null);

  // per-section validation
  const [sectionValidations, setSectionValidations] = useState({
    personalDetails: { isValid: false, errors: {} },
    addressDetails: { isValid: false, errors: {} },
    contactDetails: { isValid: false, errors: {} },
    documentDetails: { isValid: false, errors: {} },
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const { isSubmitting, submitForm } = useEmployeeInfoSubmission();

  useEffect(() => {
    const allValid = Object.values(sectionValidations).every((s) => s.isValid);
    setIsFormValid(allValid);
  }, [
    sectionValidations.personalDetails.isValid,
    sectionValidations.addressDetails.isValid,
    sectionValidations.contactDetails.isValid,
    sectionValidations.documentDetails.isValid,
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
    setFormData((p) => ({ ...p, [name]: value }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((p) => ({ ...p, [name]: files[0] }));
    } else {
      setFormData((p) => ({ ...p, [name]: null }));
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      if (e && e.preventDefault) e.preventDefault();

      if (!isFormValid) {
        setModalNotification({
          type: "warning",
          message: "Please fix all validation errors before submitting.",
        });
        return;
      }

      const toSend = { ...formData };
      toSend.userId = null;
      toSend.userEmail = "";

      try {
        const result = await submitForm(toSend, "POST");

        if (result && result.success) {
          setModalNotification({
            type: "pending",
            message:
              "Application Status: PENDING - Your employee information is being reviewed. You will be notified once verification is complete.",
          });
        } else {
          setModalNotification({
            type: "error",
            message: `Submission failed: ${result?.error || "Unknown error"}`,
          });
        }
      } catch (err) {
        setModalNotification({
          type: "error",
          message: "An unexpected error occurred. Please try again later.",
        });
        console.error("Unexpected error on employee submit:", err);
      }
    },
    [formData, isFormValid, submitForm]
  );

  return {
    formData,
    setFormData,
    modalNotification,
    setModalNotification,
    sectionValidations,
    updateSectionValidation,
    handleChange,
    handleFileChange,
    handleSubmit,
    isFormValid,
    isSubmitting,
  };
}
