import { useCallback, useEffect, useState } from "react";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import { submitTeacherInfo } from "@/hooks/TeacherApi/teacherInfoApi";
import { useTeacherInfoSubmission } from "@/hooks/TeacherApi/useTeacherInfoSubmission";

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
  academicClassId: "",
  academicClassName: "",
  subjectIds: "",
  subjectNames: "",
  skillCertifications: null,
};

export default function useTeacherForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [modalNotification, setModalNotification] = useState(null);
  const [EditDetail, SetEditDetail] = useState(false);

  const [sectionValidations, setSectionValidations] = useState({
    personalDetails: { isValid: false, errors: {} },
    addressDetails: { isValid: false, errors: {} },
    contactDetails: { isValid: false, errors: {} },
    documentDetails: { isValid: false, errors: {} },
    teacherDetails: { isValid: false, errors: {} },
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const { isSubmitting } = useTeacherInfoSubmission();

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
    sectionValidations.documentDetails.isValid,
    sectionValidations.teacherDetails.isValid,
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
        const method = EditDetail ? "PUT" : "POST";

        const toSend = { ...formData };

        toSend.userId = null;
        toSend.userEmail = "";

        const result = await submitTeacherInfo(
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
              "Application Status: PENDING - Your teacher information is being reviewed. You will be notified once verification is complete.",
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
    [EditDetail, baseUrl, formData, isFormValid, login, setToken]
  );

  return {
    formData,
    setFormData,
    modalNotification,
    setModalNotification,
    EditDetail,
    SetEditDetail,
    sectionValidations,
    updateSectionValidation,
    handleChange,
    handleFileChange,
    handleSubmit,
    isFormValid,
    isSubmitting,
  };
}
