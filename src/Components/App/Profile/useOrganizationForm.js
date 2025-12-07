import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useBaseUrl } from "../../../Context/BaseUrlContext";
import { useAuth } from "../../../Context/AuthContext";
import {
  isValidPhone,
  isValidTelephone,
} from "../../../validators/formInputValidator/ContactValidator";
import {
  isOnlyAlphabets,
  isValidString,
  validatePANNo,
} from "../../../validators/formInputValidator/TextValidator";
import {
  isJPGFile,
  isPNGFile,
  isFileBelow3MB,
} from "../../../validators/formInputValidator/FileTypeValidator";

export default function useOrganizationForm() {
  const auth = useAuth();
  const tokenString = auth ? auth.token : null; //normalize
  const baseUrl = useBaseUrl();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(0);

  const initialFormData = {
    orgName: "",
    orgAddress: "",
    telPhoneNo: "",
    phoneNo: "",
    emailAddress: "",
    logoUrl: null,
    panNumber: "",
    vatNumber: "",
    panImage: null,
    registrationImage: null,
    vatImage: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const [imageErrors, setImageErrors] = useState({
    logoUrl: "",
    panImage: "",
    registrationImage: "",
    vatImage: "",
  });

  const [previewImages, setPreviewImages] = useState({
    logoUrl: null,
    panImage: null,
    registrationImage: null,
    vatImage: null,
  });

  const [fieldTouched, setFieldTouched] = useState({});
  const [fieldValid, setFieldValid] = useState({
    orgName: true,
    orgAddress: true,
    telPhoneNo: true,
    phoneNo: true,
    panNumber: false,
  });
  const [fieldError, setFieldError] = useState({
    panNumber: "",
  });

  const [showNotification, setShowNotification] = useState(false);
  const [notificationConfig, setNotificationConfig] = useState({
    type: "info",
    message: "",
    autoClose: true,
    duration: 3000,
  });

  // Initialize form with owner data if in edit mode
  useEffect(() => {
    if (location.state?.isEditMode && location.state?.owner) {
      const owner = location.state.owner;
      setFormData((prev) => ({
        ...prev,
        orgName: owner.firstName || "",
        orgAddress: owner.address || "",
        telPhoneNo: owner.phone || "",
        phoneNo: owner.alternatePhone || "",
        emailAddress: owner.userEmail || "",
        panNumber: owner.panNo || "",
        vatNumber: owner.nagariktaNo || "",
      }));

      // Set preview images if they exist
      if (owner.photo) {
        setPreviewImages((prev) => ({
          ...prev,
          logoUrl: owner.photo,
        }));
      }
      if (owner.nagariktaPhoto) {
        setPreviewImages((prev) => ({
          ...prev,
          registrationImage: owner.nagariktaPhoto,
        }));
      }
      if (owner.panPhoto) {
        setPreviewImages((prev) => ({
          ...prev,
          panImage: owner.panPhoto,
        }));
      }
    }
  }, [location.state?.isEditMode, location.state?.owner]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldTouched((prev) => ({ ...prev, [name]: true }));

    const trimmed = value.trim();
    let valid = true;
    let error = "";
    switch (name) {
      case "orgName":
        valid = trimmed.length === 0 || isOnlyAlphabets(trimmed);
        break;
      case "orgAddress":
        valid = trimmed.length === 0 || isValidString(trimmed);
        break;
      case "telPhoneNo":
        const telValid = /^\d{2,3}-?\d+$/.test(value.trim());
        setFieldValid((prev) => ({ ...prev, telPhoneNo: telValid }));
        setFieldError((prev) => ({
          ...prev,
          telPhoneNo: telValid
            ? ""
            : "Telephone format should be: XX-YYYY... or XXX-YYYY... (dash optional)",
        }));
        break;
      case "phoneNo":
        valid = trimmed.length === 0 || isValidPhone(trimmed);
        break;
      case "panNumber":
        error = validatePANNo(trimmed) || "";
        valid = !error;
        setFieldError((prev) => ({ ...prev, [name]: error }));
        break;
      default:
        valid = true;
    }
    setFieldValid((prev) => ({ ...prev, [name]: valid }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    let validType = true;
    if (name === "logoUrl") {
      validType = isPNGFile(file);
    } else {
      validType = isJPGFile(file) || isPNGFile(file);
    }

    const validSize = isFileBelow3MB(file);

    let error = "";
    if (!validType) {
      error =
        name === "logoUrl"
          ? "Only PNG files allowed for Logo."
          : "Only JPG, JPEG, or PNG files allowed.";
    } else if (!validSize) {
      error = "File must be below 3MB.";
    }

    setImageErrors((prev) => ({ ...prev, [name]: error }));
    if (error) return;

    setFormData((prev) => ({ ...prev, [name]: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImages((prev) => ({ ...prev, [name]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    navigate("/dashboard/profile");
  };

  const validateAll = () => {
    const validations = {
      orgName:
        formData.orgName.trim().length > 0 &&
        isOnlyAlphabets(formData.orgName.trim()),
      orgAddress:
        formData.orgAddress.trim().length > 0 &&
        isValidString(formData.orgAddress.trim()),
      telPhoneNo: /^\d{2,3}-?\d+$/.test(formData.telPhoneNo.trim()),
      phoneNo:
        formData.phoneNo.trim().length > 0 &&
        isValidPhone(formData.phoneNo.trim()),
      panNumber:
        formData.panNumber.trim().length > 0 &&
        !validatePANNo(formData.panNumber.trim()), // FIXED: added !
    };
    setFieldValid(validations);

    const imageValidation = {
      logoUrl: formData.logoUrl !== null && imageErrors.logoUrl === "",
      panImage: formData.panImage !== null && imageErrors.panImage === "",
      registrationImage:
        formData.registrationImage !== null &&
        imageErrors.registrationImage === "",
    };

    const allValid =
      Object.values(validations).every(Boolean) &&
      Object.values(imageValidation).every(Boolean);

    console.log("Validation Results:", {
      validations,
      imageValidation,
      allValid,
    }); // DEBUG
    return allValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allValid = validateAll();
    console.log("Form Data:", formData);
    console.log("Image Errors:", imageErrors);
    console.log("Field Valid:", fieldValid);
    console.log("All Valid:", allValid);

    if (!allValid) {
      setNotificationConfig({
        type: "error",
        message: "Please correct the errors before submitting.",
        autoClose: false,
      });
      setShowNotification(true);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "vatImage" || value) {
        data.append(key, typeof value === "string" ? value.trim() : value);
      }
    });

    try {
      await axios.post(`${baseUrl}/org/orgs/`, data, {
        headers: {
          Authorization: `Bearer ${tokenString}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setNotificationConfig({
        type: "success",
        message: "Organization created successfully!",
        autoClose: true,
        duration: 3000,
      });
      setShowNotification(true);
    } catch (error) {
      setNotificationConfig({
        type: "error",
        message: "Failed to create organization. Please try again.",
        autoClose: false,
      });
      setShowNotification(true);
      console.error("Upload error:", error);
    }
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
    if (notificationConfig.type === "success") {
      navigate("/dashboard/profile/profile-data");
    }
  };

  const nextStep = () => {
    console.log("nextStep called, currentStep:", currentStep);

    // Only validate PAN when moving from Step 1 to Step 2
    if (currentStep === 2) {
      const panTrimmed = formData.panNumber.trim();

      if (!panTrimmed) {
        setFieldTouched((prev) => ({ ...prev, panNumber: true }));
        setFieldValid((prev) => ({ ...prev, panNumber: false }));
        setFieldError((prev) => ({
          ...prev,
          panNumber: "PAN number is required to proceed.",
        }));
        console.log("PAN is empty, blocking next step");
        return;
      }

      // Check PAN format
      const panError = validatePANNo(panTrimmed);
      if (panError) {
        setFieldTouched((prev) => ({ ...prev, panNumber: true }));
        setFieldValid((prev) => ({ ...prev, panNumber: false }));
        setFieldError((prev) => ({
          ...prev,
          panNumber: panError,
        }));
        console.log("PAN format invalid:", panError);
        return;
      }

      // PAN is valid, clear error
      setFieldError((prev) => ({ ...prev, panNumber: "" }));
      setFieldValid((prev) => ({ ...prev, panNumber: true }));
    }

    // Proceed to next step if valid (or not Step 1)
    if (currentStep < 3) {
      setCurrentStep((s) => s + 1);
      console.log("Moving to step:", currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    imageErrors,
    previewImages,
    fieldTouched,
    fieldValid,
    fieldError,
    showNotification,
    notificationConfig,
    handleChange,
    handleImageChange,
    handleCancel,
    validateAll,
    handleSubmit,
    handleNotificationClose,
    nextStep,
    prevStep,
    setShowNotification,
    setNotificationConfig,
  };
}
