import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { submitOwnerInfo } from "@/hooks/ownerInfoApi";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";

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
  website: "",
  contactPerson: "",
  nagariktaNo: "",
  panNo: "",
  nagariktaPhoto: null,
  panPhoto: null,
  userId: "",
  userEmail: "",
  self: false,
  user: null,
};

export default function useOwnerForm() {
  const location = useLocation();
  const [editDetail, setEditDetail] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const [sectionValidations, setSectionValidations] = useState({
    personalDetails: { isValid: false, errors: {} },
    addressDetails: { isValid: false, errors: {} },
    contactDetails: { isValid: false, errors: {} },
    documentDetails: { isValid: false, errors: {} },
  });

  const [modalNotification, setModalNotification] = useState(null);

  const [userTypeSelection, setUserTypeSelection] = useState({
    type: "not-me",
    subType: "",
    selectedPerson: null,
  });

  const baseUrl = useBaseUrl();
  const { login, setToken } = useAuth();

  const [isFormValid, setIsFormValid] = useState(false);
  const [existingPhotos, setExistingPhotos] = useState({
    photo: null,
    nagariktaPhoto: null,
    panPhoto: null,
  });

  // Populate form data when in edit mode
  useEffect(() => {
    if (location.state?.isEditMode && location.state?.owner) {
      const ownerData = location.state.owner;
      console.log("📝 Edit mode detected, populating form with:", ownerData);

      setEditDetail(true);
      setFormData({
        firstName: ownerData.firstName || "",
        middleName: ownerData.middleName || "",
        lastName: ownerData.lastName || "",
        dateOfBirth: ownerData.dateOfBirth || "",
        gender: ownerData.gender || "",
        photo: null, // Keep as null, will show existing photo in preview
        country: ownerData.country || "",
        province: ownerData.province || "",
        municipality: ownerData.municipality || "",
        ward: ownerData.ward || "",
        tole: ownerData.tole || "",
        pinPoint: ownerData.pinPoint || "",
        tellPhone: ownerData.tellPhone || "",
        phone: ownerData.phone || "",
        alternatePhone: ownerData.alternatePhone || "",
        website: ownerData.website || "",
        contactPerson: ownerData.contactPerson || "",
        nagariktaNo: ownerData.nagariktaNo || "",
        panNo: ownerData.panNo || "",
        nagariktaPhoto: null, // Keep as null, will show existing photo in preview
        panPhoto: null, // Keep as null, will show existing photo in preview
        userId: ownerData.userId || ownerData.id || "",
        userEmail: ownerData.userEmail || "",
        self: false,
        user: null,
      });

      // Set all sections as valid initially for edit mode
      setSectionValidations({
        personalDetails: { isValid: true, errors: {} },
        addressDetails: { isValid: true, errors: {} },
        contactDetails: { isValid: true, errors: {} },
        documentDetails: { isValid: true, errors: {} },
      });

      // Store existing photo URLs for preview
      setExistingPhotos({
        photo: ownerData.photo || null,
        nagariktaPhoto: ownerData.nagariktaPhoto || null,
        panPhoto: ownerData.panPhoto || null,
      });
    }
  }, [location.state]);

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

  const handleUserTypeChange = useCallback((selection) => {
    // keep debug log to match previous behavior
    console.log("User type selection changed:", selection);
    setUserTypeSelection(selection);
    setFormData((prev) => ({ ...prev, self: selection.type === "self" }));
  }, []);

  const showModal = useCallback((type, message) => {
    setModalNotification({ type, message });
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // preserve existing debug logs
      console.log("🔍 All section validations:", sectionValidations);
      console.log("🔍 Form data:", formData);
      console.log("🔍 isFormValid:", isFormValid);

      if (!isFormValid) {
        showModal(
          "warning",
          "Please fix all validation errors before submitting."
        );
        return;
      }

      try {
        const method = editDetail ? "PUT" : "POST";

        const result = await submitOwnerInfo(
          formData,
          baseUrl,
          login,
          setToken,
          method
        );

        if (result.success) {
          showModal(
            "pending",
            "Application Status: PENDING - Your owner information is being reviewed. You will be notified once verification is complete."
          );
          console.log("✅ Submitted data:", result.data);
        } else {
          showModal("error", `Submission failed: ${result.error}`);
          console.error("❌ Submission error:", result.error);
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
      editDetail,
      baseUrl,
      login,
      setToken,
      showModal,
    ]
  );

  return {
    editDetail,
    setEditDetail,
    formData,
    setFormData,
    sectionValidations,
    updateSectionValidation,
    handleChange,
    handleFileChange,
    handleUserTypeChange,
    handleSubmit,
    modalNotification,
    setModalNotification,
    isFormValid,
    existingPhotos,
  };
}
