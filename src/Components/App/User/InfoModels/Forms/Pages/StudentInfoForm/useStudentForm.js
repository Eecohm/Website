import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { submitStudentInfo } from "@/hooks/studentInfoApi";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";

const initialFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  photo: null,
  country: "Nepal",
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
  academicClassId: "",
  academicClassName: "",
  idCard: null,
  transferCertificate: null,
  class10Marksheet: null,
  createdByAdmin: "",
};

export default function useStudentForm() {
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const location = useLocation();
  const [isCheckingExisting, setIsCheckingExisting] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const [sectionValidations, setSectionValidations] = useState({
    personalDetails: { isValid: false, errors: {} },
    addressDetails: { isValid: false, errors: {} },
    contactDetails: { isValid: false, errors: {} },
    studentDetails: { isValid: false, errors: {} },
  });

  const [modalNotification, setModalNotification] = useState(null);

  const baseUrl = useBaseUrl();
  const { token: authToken, login, setToken } = useAuth();

  // Check if user already has a student record or if we're editing
  useEffect(() => {
    const checkExistingStudent = async () => {
      try {
        // Check if we're in editing mode
        const state = location.state;
        if (state && state.isEditing && state.studentData) {
          setIsEditing(true);
          // Store original data for change detection
          setOriginalData(state.studentData);
          // Pre-fill form with existing student data
          const studentData = state.studentData;
          const prefilledData = {
            firstName: studentData.firstName || "",
            middleName: studentData.middleName || "",
            lastName: studentData.lastName || "",
            dateOfBirth: studentData.dateOfBirth
              ? studentData.dateOfBirth.split("T")[0]
              : "",
            gender: studentData.gender || "",
            photo: null, // File objects can't be pre-filled from existing data
            country: studentData.country || "Nepal",
            province: studentData.province || "",
            municipality: studentData.municipality || "",
            ward: studentData.ward || "",
            tole: studentData.tole || "",
            pinPoint: studentData.pinPoint || "",
            tellPhone: studentData.tellPhone || "",
            phone: studentData.phone || "",
            alternatePhone: studentData.alternatePhone || "",
            contactPerson: studentData.contactPerson || "",
            userId: studentData.userId || "",
            userEmail: studentData.userEmail || "",
            academicClassId: studentData.academicClassId || "",
            academicClassName: studentData.academicClassName || "",
            idCard: null, // File objects can't be pre-filled
            transferCertificate: null, // File objects can't be pre-filled
            class10Marksheet: null, // File objects can't be pre-filled
            createdByAdmin: studentData.createdByAdmin || "",
          };
          setFormData(prefilledData);
          setIsCheckingExisting(false);
          return;
        }

        // Original logic for new submissions
        // First check user status
        const userResponse = await fetch(`${baseUrl}/user/me/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();

          // Try to get student details using user ID
          const studentResponse = await fetch(
            `${baseUrl}/user/students/${userData.id}/`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (studentResponse.ok) {
            const studentData = await studentResponse.json();
            // If student record exists (regardless of status), redirect to detail page
            navigate(
              `/dashboard/users/detail/student/detail/${studentData.id}`
            );
            return;
          }
        }
      } catch (error) {
        // If error, continue with form (endpoint might not exist or user has no record)
        console.log("Could not check existing student record:", error.message);
      } finally {
        setIsCheckingExisting(false);
      }
    };

    if (authToken) {
      checkExistingStudent();
    } else {
      setIsCheckingExisting(false);
    }
  }, [baseUrl, authToken, navigate, location.state]);

  // Track changes when editing
  useEffect(() => {
    if (isEditing && originalData) {
      const hasFormChanged = () => {
        // Compare non-file fields
        const fieldsToCompare = [
          "firstName",
          "middleName",
          "lastName",
          "dateOfBirth",
          "gender",
          "country",
          "province",
          "municipality",
          "ward",
          "tole",
          "pinPoint",
          "tellPhone",
          "phone",
          "alternatePhone",
          "contactPerson",
          "userId",
          "userEmail",
          "academicClassId",
          "academicClassName",
          "createdByAdmin",
        ];

        for (const field of fieldsToCompare) {
          const originalValue = originalData[field] || "";
          const currentValue = formData[field] || "";
          if (originalValue !== currentValue) {
            return true;
          }
        }

        // Check if any files were added (files are null in original form data)
        const fileFields = [
          "photo",
          "idCard",
          "transferCertificate",
          "class10Marksheet",
        ];
        for (const field of fileFields) {
          if (formData[field] !== null) {
            return true;
          }
        }

        return false;
      };

      setHasChanges(hasFormChanged());
    }
  }, [formData, originalData, isEditing]);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Temporarily exclude studentDetails from validation since fields are disabled
    const requiredSections = [
      "personalDetails",
      "addressDetails",
      "contactDetails",
    ];
    const allSectionsValid = requiredSections.every(
      (sectionName) => sectionValidations[sectionName].isValid
    );
    setIsFormValid(allSectionsValid);
  }, [
    sectionValidations.personalDetails.isValid,
    sectionValidations.addressDetails.isValid,
    sectionValidations.contactDetails.isValid,
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
    setFormData((prev) => ({ ...prev, [name]: value || "" }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  }, []);

  const showModal = useCallback((type, message) => {
    setModalNotification({ type, message });
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // DEBUG: Add these lines temporarily
      console.log("=== SUBMIT DEBUG ===");
      console.log("isFormValid:", isFormValid);
      console.log("sectionValidations:", sectionValidations);
      console.log(
        "Required sections (studentDetails excluded):",
        ["personalDetails", "addressDetails", "contactDetails"].map(
          (section) => `${section}: ${sectionValidations[section].isValid}`
        )
      );

      // Debug the failing sections
      console.log(
        "❌ personalDetails errors:",
        sectionValidations.personalDetails.errors
      );
      console.log(
        "ℹ️ studentDetails errors (currently disabled):",
        sectionValidations.studentDetails.errors
      );

      // For editing, allow submission if there are changes, even with validation errors
      // For new submissions, require all validations to pass
      if (!isFormValid && !isEditing) {
        showModal(
          "warning",
          "Please fix all validation errors before submitting"
        );
        return; // Stop execution here if validation fails and not editing
      }

      // For editing, ensure there are actual changes before proceeding
      if (isEditing && !hasChanges) {
        showModal("info", "No changes detected. Returning to profile.");
        setTimeout(() => {
          navigate(
            `/dashboard/users/detail/student/detail/${location.state.studentData.id}`
          );
        }, 1500);
        return;
      }

      try {
        // Submit to API
        const result = await submitStudentInfo(
          formData,
          baseUrl,
          login,
          setToken,
          isEditing ? location.state.studentData.id : null
        );
        if (result.success) {
          if (isEditing) {
            showModal("success", "Student information updated successfully!");
            // Redirect back to detail page after successful update
            setTimeout(() => {
              navigate(
                `/dashboard/users/detail/student/detail/${location.state.studentData.id}`
              );
            }, 1500);
          } else {
            showModal(
              "pending",
              "Application Status: PENDING - Your student information is being reviewed. You will be notified once verification is complete."
            );
            // Redirect to dashboard after a short delay to show the success message
            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);
          }
        } else {
          showModal("error", `Submission failed: ${result.error}`);
        }
      } catch (error) {
        showModal(
          "error",
          "❌ An unexpected error occurred during submission. Please try again later."
        );
        console.error("Unexpected error:", error);
      }
    },
    [
      sectionValidations,
      formData,
      isFormValid,
      baseUrl,
      login,
      setToken,
      isEditing,
      location.state,
      navigate,
      showModal,
    ]
  );

  return {
    formData,
    setFormData,
    sectionValidations,
    updateSectionValidation,
    handleChange,
    handleFileChange,
    handleSubmit,
    modalNotification,
    setModalNotification,
    isFormValid,
    isCheckingExisting,
    isEditing,
    hasChanges,
  };
}
