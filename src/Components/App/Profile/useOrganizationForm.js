import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "../../../validators/formInputValidator/TextValidator";
import {
  isJPGFile,
  isPNGFile,
  isFileBelow3MB,
} from "../../../validators/formInputValidator/FileTypeValidator";

export default function useOrganizationForm() {
  const token = useAuth();
  const baseUrl = useBaseUrl();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
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
  });

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
  });

  const [showNotification, setShowNotification] = useState(false);
  const [notificationConfig, setNotificationConfig] = useState({
    type: "info",
    message: "",
    autoClose: true,
    duration: 3000,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldTouched((prev) => ({ ...prev, [name]: true }));

    const trimmed = value.trim();
    let valid = true;
    switch (name) {
      case "orgName":
        valid = trimmed.length === 0 || isOnlyAlphabets(trimmed);
        break;
      case "orgAddress":
        valid = trimmed.length === 0 || isValidString(trimmed);
        break;
      case "telPhoneNo":
        valid = trimmed.length === 0 || isValidTelephone(trimmed);
        break;
      case "phoneNo":
        valid = trimmed.length === 0 || isValidPhone(trimmed);
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
      orgName: isOnlyAlphabets(formData.orgName.trim()),
      orgAddress: isValidString(formData.orgAddress.trim()),
      telPhoneNo: isValidTelephone(formData.telPhoneNo.trim()),
      phoneNo: isValidPhone(formData.phoneNo.trim()),
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

    return allValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allValid = validateAll();
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
          Authorization: `Bearer ${token.token}`,
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
    if (currentStep < 3) setCurrentStep((s) => s + 1);
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
