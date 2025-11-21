import React from "react";
import ModalNotification from "@/GlobalComponets/ModalNotification";
import useOrganizationForm from "@/Components/App/Profile/useOrganizationForm";
import {
  ArrowLeft,
  Building,
  Phone,
  FileText,
  Upload,
  Check,
  ChevronRight,
} from "lucide-react";
import styles from "./styles/OrganizationForm.module.css";

const OrganizationForm = () => {
  const {
    currentStep,
    formData,
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
    handleSubmit,
    handleNotificationClose,
    nextStep,
    prevStep,
  } = useOrganizationForm();

  const steps = [
    { title: "Basic Info", icon: Building },
    { title: "Contact", icon: Phone },
    { title: "Legal Details", icon: FileText },
    { title: "Documents", icon: Upload },
  ];

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
                    fieldTouched.orgName && !fieldValid.orgName
                      ? styles.error
                      : ""
                  }`}
                  placeholder="Enter organization name"
                  required
                />
                {fieldTouched.orgName &&
                  !fieldValid.orgName &&
                  formData.orgName.trim() !== "" && (
                    <p className={styles.errorMessage}>
                      Only alphabets and spaces allowed.
                    </p>
                  )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Organization Address</label>
                <textarea
                  name="orgAddress"
                  value={formData.orgAddress}
                  onChange={handleChange}
                  className={`${styles.formTextarea} ${
                    fieldTouched.orgAddress && !fieldValid.orgAddress
                      ? styles.error
                      : ""
                  }`}
                  placeholder="Enter full address"
                  rows="3"
                  required
                />
                {fieldTouched.orgAddress &&
                  !fieldValid.orgAddress &&
                  formData.orgAddress.trim() !== "" && (
                    <p className={styles.errorMessage}>
                      Only letters, ",", "-", and spaces allowed.
                    </p>
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
                    fieldTouched.telPhoneNo && !fieldValid.telPhoneNo
                      ? styles.error
                      : ""
                  }`}
                  placeholder="01-XXXXXXX"
                  required
                />
                {fieldTouched.telPhoneNo && !fieldValid.telPhoneNo && (
                  <p className={styles.errorMessage}>
                    Invalid telephone number.
                  </p>
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
                    fieldTouched.phoneNo && !fieldValid.phoneNo
                      ? styles.error
                      : ""
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
                  className={`${styles.formInput} ${
                    fieldTouched.panNumber && fieldError.panNumber
                      ? styles.error
                      : ""
                  }`}
                  placeholder="XXXXXXXXX"
                  required
                />
                {fieldTouched.panNumber && fieldError.panNumber && (
                  <p className={styles.errorMessage}>{fieldError.panNumber}</p>
                )}
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
                      <span className={styles.fileName}>
                        {formData[key].name}
                      </span>
                    )}
                  </div>
                  {imageErrors[key] && (
                    <p className={styles.errorMessage}>{imageErrors[key]}</p>
                  )}
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
                  <div
                    className={`${styles.stepIcon} ${
                      isCompleted
                        ? styles.completed
                        : isActive
                        ? styles.active
                        : styles.inactive
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <IconComponent className="w-6 h-6" />
                    )}
                  </div>
                  <div className={styles.stepText}>
                    <div
                      className={`${styles.stepTitle} ${
                        isActive
                          ? styles.active
                          : isCompleted
                          ? styles.completed
                          : styles.inactive
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className={styles.stepNumber}>
                      Step {index + 1} of {steps.length}
                    </div>
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
                <p className={styles.formSubtitle}>
                  Create your organization profile
                </p>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.stepContent}>{renderStepContent()}</div>

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
