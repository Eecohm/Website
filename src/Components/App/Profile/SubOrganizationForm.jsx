import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { 
  ArrowLeft, 
  Building2, 
  FileText, 
  Check, 
  Receipt, 
  Upload, 
  Eye, 
  X,
  Save,
  AlertCircle,
  CheckCircle,
  User,
  Settings,
  Loader2
} from "lucide-react";
import axios from "axios";
import styles from "./styles/SubOrgForm.module.css";
import { useBaseUrl } from "../../../Context/BaseUrlContext";
import { useAuth } from "../../../Context/AuthContext";


const SubOrganizationForm = () => {
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    organization: "",
    subOrgName: "",
    descriptionText: "",
    differentEntity: false,
    hasVAT: false,
    panNumber: "",
    vatNumber: "",
    logoImage: null,
    panImage: null,
    registrationImage: null,
    vatImage: null,
  });
  
  const [fieldTouched, setFieldTouched] = useState({});
  const [fieldValid, setFieldValid] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [previewImages, setPreviewImages] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const { token } = useAuth();

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Validation functions
  const isOnlyAlphabets = (value) => /^[a-zA-Z\s]*$/.test(value);
  const isValidString = (value) => /^[a-zA-Z0-9\s.,!?-]*$/.test(value);
  const isJPGFile = (file) => /\.(jpg|jpeg)$/i.test(file.name);
  const isPNGFile = (file) => /\.png$/i.test(file.name);
  const isFileBelow3MB = (file) => file.size <= 3 * 1024 * 1024;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFieldTouched((prev) => ({ ...prev, [name]: true }));

    let valid = true;
    if (name === "subOrgName") {
      valid = isOnlyAlphabets(value.trim()) || value.trim() === "";
    } else if (name === "descriptionText") {
      valid = isValidString(value.trim()) || value.trim() === "";
    } else if (name === "panNumber" || name === "vatNumber") {
      valid = value.trim().length === 0 || /^[0-9]+$/.test(value.trim());
    }

    setFieldValid((prev) => ({ ...prev, [name]: valid }));
    
    // Auto-progress steps based on completion
    updateProgressStep();
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    let validType = isJPGFile(file) || isPNGFile(file);
    let validSize = isFileBelow3MB(file);
    let error = "";

    if (!validType) error = "Only JPG, JPEG, or PNG allowed.";
    else if (!validSize) error = "File must be below 3MB.";

    setImageErrors((prev) => ({ ...prev, [name]: error }));
    if (error) return;

    setFormData((prev) => ({ ...prev, [name]: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImages((prev) => ({ ...prev, [name]: reader.result }));
    };
    reader.readAsDataURL(file);
    
    // Update progress
    updateProgressStep();
  };

  const updateProgressStep = () => {
    // Step 1: Basic Information
    const hasBasicInfo = formData.subOrgName.trim() && formData.descriptionText.trim();
    
    // Step 2: Entity Configuration  
    const hasEntityConfig = hasBasicInfo;
    
    // Step 3: Document Upload
    const hasRequiredDocs = formData.logoImage && 
      (!formData.differentEntity || (formData.panImage && formData.registrationImage)) &&
      (!formData.hasVAT || formData.vatImage);

    if (hasRequiredDocs) {
      setCurrentStep(3);
    } else if (hasEntityConfig) {
      setCurrentStep(2);
    } else {
      setCurrentStep(1);
    }
  };

  const validateAll = () => {
    const validations = {
      subOrgName: formData.subOrgName.trim() && isOnlyAlphabets(formData.subOrgName.trim()),
      descriptionText: formData.descriptionText.trim() && isValidString(formData.descriptionText.trim()),
      panNumber: !formData.differentEntity || (formData.panNumber.trim() && /^[0-9]+$/.test(formData.panNumber.trim())),
      vatNumber: !formData.hasVAT || (formData.vatNumber.trim() && /^[0-9]+$/.test(formData.vatNumber.trim())),
    };
    
    setFieldValid(validations);

    const imageValidation = {
      logoImage: formData.logoImage && !imageErrors.logoImage,
      panImage: !formData.differentEntity || (formData.panImage && !imageErrors.panImage),
      registrationImage: !formData.differentEntity || (formData.registrationImage && !imageErrors.registrationImage),
      vatImage: !formData.hasVAT || (formData.vatImage && !imageErrors.vatImage),
    };

    return (
      Object.values(validations).every(Boolean) &&
      Object.values(imageValidation).every(Boolean)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    if (!validateAll()) {
      setNotification({ 
        show: true, 
        message: "Please correct the errors before submitting.", 
        type: "error" 
      });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("organization", formData.organization);
    formDataToSend.append("subOrgName", formData.subOrgName);
    formDataToSend.append("descriptionText", formData.descriptionText);
    formDataToSend.append("differentEntity", formData.differentEntity);
    formDataToSend.append("hasVAT", formData.hasVAT);
    formDataToSend.append("panNumber", formData.panNumber || "");
    formDataToSend.append("vatNumber", formData.vatNumber || "");
    
    if (formData.logoImage) formDataToSend.append("logo", formData.logoImage);
    if (formData.panImage) formDataToSend.append("panImage", formData.panImage);
    if (formData.registrationImage) formDataToSend.append("registrationImage", formData.registrationImage);
    if (formData.vatImage) formDataToSend.append("vatImage", formData.vatImage);

    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${baseUrl}/org/suborgs/`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.status === 200 || response.status === 201) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setNotification({
          show: true,
          message: "Sub-Organization created successfully!",
          type: "success",
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      
      if (error.response?.data) {
        setFieldErrors(error.response.data);
        setNotification({
          show: true,
          message: "Please check the form for validation errors.",
          type: "error",
        });
      } else {
        setNotification({
          show: true,
          message: "An unexpected error occurred. Please try again.",
          type: "error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/profile");
  };

  const handleViewImage = (imageType) => {
    if (previewImages[imageType]) {
      navigate(`/dashboard/profile/view-image/${imageType}`, {
        state: { image: previewImages[imageType] },
      });
    }
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, show: false });
    if (notification.type === "success") {
      navigate("/dashboard/profile/sub-organization");
    }
  };

  const getStepStatus = (step) => {
    if (step < currentStep) return "completed";
    if (step === currentStep) return "active";
    return "inactive";
  };

  const getFormStatus = () => {
    const requiredFieldsComplete = formData.subOrgName && formData.descriptionText;
    const documentsComplete = formData.logoImage && 
      (!formData.differentEntity || (formData.panImage && formData.registrationImage)) &&
      (!formData.hasVAT || formData.vatImage);

    return {
      requiredFields: requiredFieldsComplete ? "Complete" : "In Progress",
      documents: documentsComplete ? "Complete" : "Pending"
    };
  };

  return (
    <div className={styles.container}>
      {/* Notification Modal */}
      {notification.show && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              {notification.type === "success" ? (
                <CheckCircle className={styles.successIcon} />
              ) : (
                <AlertCircle className={styles.errorIcon} />
              )}
              <h3 className={styles.modalTitle}>
                {notification.type === "success" ? "Success" : "Error"}
              </h3>
            </div>
            <p className={styles.modalMessage}>{notification.message}</p>
            <button
              onClick={handleNotificationClose}
              className={styles.modalButton}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <button onClick={handleCancel} className={styles.backButton}>
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
          <h1 className={styles.title}>
            <Building2 className={styles.titleIcon} size={28} />
            <span>Add Sub-Organization</span>
          </h1>
        </div>

        <div className={styles.sidebarContent}>
          <div className={styles.stepList}>
            <div className={styles.step}>
              <div className={`${styles.stepNumber} ${
                getStepStatus(1) === "completed" ? styles.stepNumberCompleted :
                getStepStatus(1) === "active" ? styles.stepNumberActive :
                styles.stepNumberInactive
              }`}>
                {getStepStatus(1) === "completed" ? <Check size={16} /> : "1"}
              </div>
              <span className={`${styles.stepLabel} ${
                getStepStatus(1) === "active" ? styles.stepLabelActive :
                getStepStatus(1) === "completed" ? styles.stepLabelCompleted :
                styles.stepLabelInactive
              }`}>
                Basic Information
              </span>
            </div>
            
            <div className={styles.step}>
              <div className={`${styles.stepNumber} ${
                getStepStatus(2) === "completed" ? styles.stepNumberCompleted :
                getStepStatus(2) === "active" ? styles.stepNumberActive :
                styles.stepNumberInactive
              }`}>
                {getStepStatus(2) === "completed" ? <Check size={16} /> : "2"}
              </div>
              <span className={`${styles.stepLabel} ${
                getStepStatus(2) === "active" ? styles.stepLabelActive :
                getStepStatus(2) === "completed" ? styles.stepLabelCompleted :
                styles.stepLabelInactive
              }`}>
                Entity Configuration
              </span>
            </div>
            
            <div className={styles.step}>
              <div className={`${styles.stepNumber} ${
                getStepStatus(3) === "completed" ? styles.stepNumberCompleted :
                getStepStatus(3) === "active" ? styles.stepNumberActive :
                styles.stepNumberInactive
              }`}>
                {getStepStatus(3) === "completed" ? <Check size={16} /> : "3"}
              </div>
              <span className={`${styles.stepLabel} ${
                getStepStatus(3) === "active" ? styles.stepLabelActive :
                getStepStatus(3) === "completed" ? styles.stepLabelCompleted :
                styles.stepLabelInactive
              }`}>
                Document Upload
              </span>
            </div>
          </div>

          <div className={styles.statusCard}>
            <h3 className={styles.statusTitle}>Form Status</h3>
            <div>
              <div className={styles.statusItem}>
                <span className={styles.statusLabel}>Required Fields</span>
                <span className={`${styles.statusValue} ${
                  getFormStatus().requiredFields === "Complete" ? styles.statusComplete : styles.statusProgress
                }`}>
                  {getFormStatus().requiredFields}
                </span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.statusLabel}>Documents</span>
                <span className={`${styles.statusValue} ${
                  getFormStatus().documents === "Complete" ? styles.statusComplete : styles.statusPending
                }`}>
                  {getFormStatus().documents}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
              
              {/* Basic Information */}
              <div className={styles.section}>
                <h2 className={styles.sectionHeader}>
                  <User className={styles.sectionIcon} size={20} />
                  <span>Basic Information</span>
                </h2>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Sub-Organization Name *
                  </label>
                  <input
                    type="text"
                    name="subOrgName"
                    value={formData.subOrgName}
                    onChange={handleChange}
                    className={
                      (fieldTouched.subOrgName && !fieldValid.subOrgName) ||
                      fieldErrors.subOrgName
                        ? `${styles.input} ${styles.inputError}`
                        : styles.input
                    }
                    placeholder="Enter sub-organization name"
                    required
                  />
                  {fieldTouched.subOrgName && !fieldValid.subOrgName && (
                    <p className={styles.errorMessage}>
                      <AlertCircle size={16} />
                      <span>Only alphabets and spaces allowed.</span>
                    </p>
                  )}
                  {fieldErrors.subOrgName && (
                    <p className={styles.errorMessage}>
                      <AlertCircle size={16} />
                      <span>{fieldErrors.subOrgName}</span>
                    </p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Description *
                  </label>
                  <textarea
                    name="descriptionText"
                    value={formData.descriptionText}
                    onChange={handleChange}
                    rows={4}
                    className={
                      (fieldTouched.descriptionText && !fieldValid.descriptionText) ||
                      fieldErrors.descriptionText
                        ? `${styles.textarea} ${styles.inputError}`
                        : styles.textarea
                    }
                    placeholder="Enter organization description"
                    required
                  />
                  {fieldTouched.descriptionText && !fieldValid.descriptionText && (
                    <p className={styles.errorMessage}>
                      <AlertCircle size={16} />
                      <span>Only letters, numbers, spaces, and punctuation allowed.</span>
                    </p>
                  )}
                  {fieldErrors.descriptionText && (
                    <p className={styles.errorMessage}>
                      <AlertCircle size={16} />
                      <span>{fieldErrors.descriptionText}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Configuration Options */}
              <div className={styles.section}>
                <h2 className={styles.sectionHeader}>
                  <Settings className={styles.sectionIcon} size={20} />
                  <span>Configuration</span>
                </h2>
                
                <div className={styles.checkboxGrid}>
                  <label className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      name="differentEntity"
                      checked={formData.differentEntity}
                      onChange={handleChange}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkboxLabel}>Different Entity</span>
                    <span className={styles.checkboxDescription}>
                      This sub-organization is a separate legal entity
                    </span>
                  </label>

                  <label className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      name="hasVAT"
                      checked={formData.hasVAT}
                      onChange={handleChange}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkboxLabel}>Has VAT</span>
                    <span className={styles.checkboxDescription}>
                      This organization is VAT registered
                    </span>
                  </label>
                </div>
              </div>

              {/* Logo Upload */}
              <div className={styles.section}>
                <h2 className={styles.sectionHeader}>
                  <Upload className={styles.sectionIcon} size={20} />
                  <span>Logo Upload</span>
                </h2>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Logo Image *
                  </label>
                  <input
                    type="file"
                    name="logoImage"
                    onChange={handleImageChange}
                    accept="image/*"
                    className={styles.fileInput}
                    required
                  />
                  {imageErrors.logoImage && (
                    <p className={styles.errorMessage}>
                      <AlertCircle size={16} />
                      <span>{imageErrors.logoImage}</span>
                    </p>
                  )}
                  {fieldErrors.logo && (
                    <p className={styles.errorMessage}>
                      <AlertCircle size={16} />
                      <span>{fieldErrors.logo}</span>
                    </p>
                  )}
                  {previewImages.logoImage && (
                    <div className={styles.imagePreviewContainer}>
                      <img
                        src={previewImages.logoImage}
                        alt="Logo preview"
                        className={styles.imagePreview}
                        onClick={() => handleViewImage("logoImage")}
                      />
                      <button
                        type="button"
                        onClick={() => handleViewImage("logoImage")}
                        className={styles.viewImageButton}
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Conditional Entity Information */}
              {formData.differentEntity && (
                <div className={styles.section}>
                  <h2 className={styles.sectionHeader}>
                    <Receipt className={styles.sectionIcon} size={20} />
                    <span>Entity Information</span>
                  </h2>
                  
                  <div className={styles.twoColumn}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        PAN Number *
                      </label>
                      <input
                        type="text"
                        name="panNumber"
                        value={formData.panNumber}
                        onChange={handleChange}
                        className={
                          (fieldTouched.panNumber && !fieldValid.panNumber) ||
                          fieldErrors.panNumber
                            ? `${styles.input} ${styles.inputError}`
                            : styles.input
                        }
                        placeholder="Enter PAN number"
                        required
                      />
                      {fieldTouched.panNumber && !fieldValid.panNumber && (
                        <p className={styles.errorMessage}>
                          <AlertCircle size={16} />
                          <span>Only numeric values allowed.</span>
                        </p>
                      )}
                      {fieldErrors.panNumber && (
                        <p className={styles.errorMessage}>
                          <AlertCircle size={16} />
                          <span>{fieldErrors.panNumber}</span>
                        </p>
                      )}
                    </div>

                    {formData.hasVAT && (
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          VAT Number *
                        </label>
                        <input
                          type="text"
                          name="vatNumber"
                          value={formData.vatNumber}
                          onChange={handleChange}
                          className={
                            (fieldTouched.vatNumber && !fieldValid.vatNumber) ||
                            fieldErrors.vatNumber
                              ? `${styles.input} ${styles.inputError}`
                              : styles.input
                          }
                          placeholder="Enter VAT number"
                          required
                        />
                        {fieldTouched.vatNumber && !fieldValid.vatNumber && (
                          <p className={styles.errorMessage}>
                            <AlertCircle size={16} />
                            <span>Only numeric values allowed.</span>
                          </p>
                        )}
                        {fieldErrors.vatNumber && (
                          <p className={styles.errorMessage}>
                            <AlertCircle size={16} />
                            <span>{fieldErrors.vatNumber}</span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Document Uploads */}
                  <div className={styles.imageGrid}>
                    {["panImage", "registrationImage", "vatImage"].map(
                      (imgType) =>
                        (imgType !== "vatImage" || formData.hasVAT) && (
                          <div className={styles.formGroup} key={imgType}>
                            <label className={styles.label}>
                              {imgType.replace("Image", " Image").replace(/([A-Z])/g, " $1")} *
                            </label>
                            <input
                              type="file"
                              name={imgType}
                              onChange={handleImageChange}
                              accept="image/*"
                              className={styles.fileInput}
                              required
                            />
                            {imageErrors[imgType] && (
                              <p className={styles.errorMessage}>
                                <AlertCircle size={16} />
                                <span>{imageErrors[imgType]}</span>
                              </p>
                            )}
                            {fieldErrors[imgType] && (
                              <p className={styles.errorMessage}>
                                <AlertCircle size={16} />
                                <span>{fieldErrors[imgType]}</span>
                              </p>
                            )}
                            {previewImages[imgType] && (
                              <div className={styles.imagePreviewContainer}>
                                <img
                                  src={previewImages[imgType]}
                                  alt={`${imgType} preview`}
                                  className={styles.imagePreview}
                                  onClick={() => handleViewImage(imgType)}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleViewImage(imgType)}
                                  className={styles.viewImageButton}
                                >
                                  <Eye size={16} />
                                  <span>View</span>
                                </button>
                              </div>
                            )}
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className={styles.buttonContainer}>
                <button
                  type="button"
                  onClick={handleCancel}
                  className={styles.cancelButton}
                  disabled={isSubmitting}
                >
                  <X size={18} />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  className={`${styles.saveButton} ${isSubmitting ? styles.buttonDisabled : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className={styles.spinner} size={18} />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Create Sub-Organization</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubOrganizationForm;