import React, { useState } from "react";
import { useAuth } from "../Login/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUserVerification } from "../Login/Auth/useUserVerification";
import NavBar from "../NavBar/NavBar";
import styles from "./KycFormNew.module.css";

const KycFormNew = ({ onSuccess }) => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const { role } = useUserVerification();

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    address: "",
    idType: "national_id",
    idNumber: "",
    role: "",
    idFront: null,
    idBack: null,
    selfie: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const roles = [
    { value: "student", label: "Student" },
    { value: "teacher", label: "Teacher" },
    { value: "employee", label: "Employee" },
    { value: "admin", label: "Administrator" },
    { value: "owner", label: "Owner" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  // Function to redirect based on user role after KYC completion
  const redirectBasedOnRole = () => {
    switch (role?.toLowerCase()) {
      case "student":
        navigate("/dashboard/students");
        break;
      case "teacher":
        navigate("/dashboard/reports");
        break;
      case "admin":
        navigate("/dashboard/admin");
        break;
      case "employee":
        navigate("/dashboard/reports");
        break;
      case "owner":
        navigate("/dashboard/admin");
        break;
      default:
        navigate("/dashboard");
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      setError("Please select your role.");
      return;
    }

    if (!formData.idFront || !formData.idBack || !formData.selfie) {
      setError("Please upload all required documents.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          submitData.append(key, formData[key]);
        }
      });

      if (userId) {
        submitData.append("userId", userId);
      }

      console.log("Submitting KYC data:", Object.fromEntries(submitData));
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (onSuccess) {
        onSuccess();
      } else {
        // Redirect based on user role after successful KYC submission
        redirectBasedOnRole();
      }
    } catch (err) {
      setError(err.message || "Failed to submit KYC. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("KycFormNew component rendering at:", window.location.href);
  console.log("KycFormNew props:", { onSuccess });
  console.log("KycFormNew state:", { userId, role, isSubmitting, error });

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.formCard}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Complete Your KYC Verification</h1>
            <p className={styles.subtitle}>
              Please provide your information to verify your identity
            </p>
          </div>

          {/* Scrollable Form Content */}
          <div className={styles.scrollableContent}>
            <form onSubmit={handleSubmit} className={styles.form}>
              {error && <div className={styles.errorMessage}>{error}</div>}

              {/* Role Selection Section - Full Width */}
              <div className={`${styles.section} ${styles.fullWidthSection}`}>
                <h3 className={styles.sectionTitle}>
                  <span className={styles.sectionIcon}>🎯</span>
                  Select Your Role
                </h3>

                <div className={styles.gridContainer}>
                  {roles.map((role) => (
                    <label
                      key={role.value}
                      className={`${styles.radioLabel} ${
                        formData.role === role.value
                          ? styles.radioLabelSelected
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={formData.role === role.value}
                        onChange={handleInputChange}
                        className={styles.radioInput}
                      />
                      {role.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Two-column layout for Personal Info and Document Upload */}
              <div className={styles.formSectionsContainer}>
                {/* Personal Information Section */}
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>👤</span>
                    Personal Information
                  </h3>

                  <div className={styles.gridContainerLarge}>
                    <div>
                      <label className={styles.label}>Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className={styles.label}>Date of Birth *</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className={styles.textarea}
                      placeholder="Enter your full address"
                    />
                  </div>

                  <div className={styles.gridContainerLarge}>
                    <div>
                      <label className={styles.label}>ID Type *</label>
                      <select
                        name="idType"
                        value={formData.idType}
                        onChange={handleInputChange}
                        required
                        className={styles.select}
                      >
                        <option value="national_id">National ID</option>
                        <option value="passport">Passport</option>
                        <option value="driving_license">Driving License</option>
                      </select>
                    </div>

                    <div>
                      <label className={styles.label}>ID Number *</label>
                      <input
                        type="text"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                        placeholder="Enter your ID number"
                      />
                    </div>
                  </div>
                </div>

                {/* Document Upload Section */}
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>📄</span>
                    Document Upload
                  </h3>

                  <div className={styles.gridContainerLarge}>
                    {[
                      { name: "idFront", label: "ID Front Image *" },
                      { name: "idBack", label: "ID Back Image *" },
                      { name: "selfie", label: "Selfie Photo *" },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className={styles.label}>{field.label}</label>
                        <input
                          type="file"
                          name={field.name}
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                          className={styles.fileInput}
                        />
                        {formData[field.name] && (
                          <p className={styles.fileSuccessMessage}>
                            ✓ {formData[field.name].name}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className={styles.submitContainer}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitButton}
                >
                  {isSubmitting ? "Submitting..." : "Submit KYC Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycFormNew;
