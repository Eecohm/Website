import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBaseUrl } from "../../../BaseUrlContext";
import { useAuth } from "../Login/Auth/AuthContext";
import ModalNotification from "../../../GlobalComponets/ModalNotification";
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
import { ArrowLeft, Building, Phone, FileText, Upload, Check, ChevronRight } from "lucide-react";
import styles from "./styles/OrganizationForm.module.css";

const OrganizationForm = () => {
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

  const steps = [
    { title: "Basic Info", icon: Building },
    { title: "Contact", icon: Phone },
    { title: "Legal Details", icon: FileText },
    { title: "Documents", icon: Upload }
  ];

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
      error = name === "logoUrl"
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
        formData.registrationImage !== null && imageErrors.registrationImage === "",
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
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className={styles.stepGrid}>
            <div className={styles.gridCols1}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Organization Name</label>
                <input
                  type="text"
                  name="orgName"
                  value={formData.orgName}
                  onChange={handleChange}
                  className={`${styles.formInput} ${
                    fieldTouched.orgName && !fieldValid.orgName ? styles.error : ""
                  }`}
                  placeholder="Enter organization name"
                  required
                />
                {fieldTouched.orgName && !fieldValid.orgName && formData.orgName.trim() !== "" && (
                  <p className={styles.errorMessage}>Only alphabets and spaces allowed.</p>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Organization Address</label>
                <textarea
                  name="orgAddress"
                  value={formData.orgAddress}
                  onChange={handleChange}
                  className={`${styles.formTextarea} ${
                    fieldTouched.orgAddress && !fieldValid.orgAddress ? styles.error : ""
                  }`}
                  placeholder="Enter full address"
                  rows="3"
                  required
                />
                {fieldTouched.orgAddress && !fieldValid.orgAddress && formData.orgAddress.trim() !== "" && (
                  <p className={styles.errorMessage}>Only letters, ",", "-", and spaces allowed.</p>
                )}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className={styles.stepGrid}>
            <div className={styles.gridCols2}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Telephone Number</label>
                <input
                  type="text"
                  name="telPhoneNo"
                  value={formData.telPhoneNo}
                  onChange={handleChange}
                  className={`${styles.formInput} ${
                    fieldTouched.telPhoneNo && !fieldValid.telPhoneNo ? styles.error : ""
                  }`}
                  placeholder="01-XXXXXXX"
                  required
                />
                {fieldTouched.telPhoneNo && !fieldValid.telPhoneNo && (
                  <p className={styles.errorMessage}>Invalid telephone number.</p>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone Number</label>
                <input
                  type="text"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className={`${styles.formInput} ${
                    fieldTouched.phoneNo && !fieldValid.phoneNo ? styles.error : ""
                  }`}
                  placeholder="98XXXXXXXX"
                  required
                />
                {fieldTouched.phoneNo && !fieldValid.phoneNo && (
                  <p className={styles.errorMessage}>Invalid phone number.</p>
                )}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email Address</label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="organization@example.com"
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.stepGrid}>
            <div className={styles.gridCols2}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>PAN Number</label>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="XXXXXXXXX"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>VAT Number</label>
                <input
                  type="text"
                  name="vatNumber"
                  value={formData.vatNumber}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="XXXXXXXXX"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={styles.stepGrid}>
            <div className={styles.gridCols2}>
              {Object.entries({
                logoUrl: "Logo (PNG only)",
                panImage: "PAN Image",
                registrationImage: "Registration Image",
                vatImage: "VAT Image (Optional)",
              }).map(([key, label]) => (
                <div key={key} className={styles.formGroup}>
                  <label className={styles.formLabel}>{label}</label>
                  <div className={styles.fileUploadContainer}>
                    <input
                      type="file"
                      name={key}
                      onChange={handleImageChange}
                      accept="image/*"
                      required={key !== "vatImage"}
                      className={styles.fileInput}
                      id={key}
                    />
                    <label htmlFor={key} className={styles.fileLabel}>
                      <Upload className="w-5 h-5" />
                      Choose File
                    </label>
                    {formData[key] && (
                      <span className={styles.fileName}>{formData[key].name}</span>
                    )}
                  </div>
                  {imageErrors[key] && <p className={styles.errorMessage}>{imageErrors[key]}</p>}
                  {previewImages[key] && (
                    <div className={styles.imagePreview}>
                      <img
                        src={previewImages[key]}
                        alt={`${label} Preview`}
                        className={styles.previewImage}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button onClick={handleCancel} className={styles.backButton}>
          <ArrowLeft className="w-5 h-5" />
          Back to Profile
        </button>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <React.Fragment key={index}>
                <div className={styles.stepItem}>
                  <div className={`${styles.stepIcon} ${
                    isCompleted ? styles.completed : 
                    isActive ? styles.active : 
                    styles.inactive
                  }`}>
                    {isCompleted ? <Check className="w-6 h-6" /> : <IconComponent className="w-6 h-6" />}
                  </div>
                  <div className={styles.stepText}>
                    <div className={`${styles.stepTitle} ${
                      isActive ? styles.active : 
                      isCompleted ? styles.completed : 
                      styles.inactive
                    }`}>
                      {step.title}
                    </div>
                    <div className={styles.stepNumber}>Step {index + 1} of {steps.length}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight 
                    className={`w-5 h-5 ${styles.chevron} ${
                      index < currentStep ? styles.passed : styles.upcoming
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Form Container */}
      <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
          <div className={styles.formCard}>
            <div className={styles.formContent}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Organization Details</h2>
                <p className={styles.formSubtitle}>Create your organization profile</p>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.stepContent}>
                  {renderStepContent()}
                </div>

                {/* Navigation Buttons */}
                <div className={styles.navigationButtons}>
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`${styles.button} ${styles.buttonPrev}`}
                  >
                    Previous
                  </button>

                  <div className={styles.buttonGroup}>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className={`${styles.button} ${styles.buttonCancel}`}
                    >
                      Cancel
                    </button>
                    
                    {currentStep === steps.length - 1 ? (
                      <button
                        type="submit"
                        className={`${styles.button} ${styles.buttonSubmit}`}
                      >
                        Create Organization
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={nextStep}
                        className={`${styles.button} ${styles.buttonNext}`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Notification */}
      {showNotification && (
        <ModalNotification
          {...notificationConfig}
          onClose={handleNotificationClose}
        />
      )}
    </div>
  );
};

export default OrganizationForm;