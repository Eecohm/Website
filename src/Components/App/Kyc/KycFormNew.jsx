import React, { useState, useEffect } from "react";
import { useAuth } from "../Login/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUserVerification } from "../Login/Auth/useUserVerification";
import { useBaseUrl } from "../../../BaseUrlContext";
import NavBar from "../NavBar/NavBar";
import styles from "./KycFormNew.module.css";

const KycFormNew = ({ onSuccess }) => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
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
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFormEditable, setIsFormEditable] = useState(true);
  const [error, setError] = useState("");

  const roles = [
    { value: "student", label: "Student" },
    { value: "teacher", label: "Teacher" },
    { value: "employee", label: "Employee" },
    { value: "admin", label: "Administrator" },
    { value: "owner", label: "Owner" },
  ];

  // Fetch existing KYC data when component loads
  useEffect(() => {
    const fetchExistingKycData = async () => {
      try {
        const response = await fetch(`${baseUrl}/kyc/details/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          try {
            const data = await response.json();
            if (data.kyc_data) {
              // Populate form with existing data
              setFormData({
                fullName: data.kyc_data.fullName || "",
                dateOfBirth: data.kyc_data.dateOfBirth || "",
                address: data.kyc_data.address || "",
                idType: data.kyc_data.idType || "national_id",
                idNumber: data.kyc_data.idNumber || "",
                role: data.kyc_data.role || "",
                idFront: null, // Files will need to be re-uploaded
                idBack: null,
                selfie: null,
              });
              setIsEditMode(true);
              setIsFormEditable(false); // Start in view mode for existing data
            }
          } catch (parseError) {
            console.log("Error parsing KYC data response:", parseError);
          }
        }
      } catch (error) {
        console.log("No existing KYC data found:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingKycData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleCancelClick = () => {
    setIsFormEditable(false);
    // Optionally reload the form data from the server
  };

  const handleSaveClick = async () => {
    // Save changes without full submission
    setIsFormEditable(false);
    // You can add a save API call here if needed
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

      // Call backend API to submit KYC
      const response = await fetch(`${baseUrl}/kyc/submit/`, {
        method: "POST",
        body: submitData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Check if response is ok first
      if (!response.ok) {
        // Try to get error message from response if it's JSON
        let errorMessage = "KYC submission failed";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          // If response is not JSON, use status text
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      // Try to parse successful response as JSON
      let result = {};
      try {
        result = await response.json();
      } catch (parseError) {
        console.warn("Response is not valid JSON, assuming success");
        result = { success: true };
      }

      // Update auth context with new KYC status
      console.log("KYC submitted successfully. Status:", result.kyc_status);

      // Redirect back to dashboard with status card display
      navigate("/dashboard?showKycStatus=true");
    } catch (err) {
      setError(err.message || "Failed to submit KYC. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("KycFormNew component rendering at:", window.location.href);
  console.log("KycFormNew props:", { onSuccess });
  console.log("KycFormNew state:", { userId, role, isSubmitting, error });

  // Show loading while fetching existing data
  if (isLoading) {
    return (
      <>
        <NavBar />
        <div className={styles.container}>
          <div className={styles.formCard}>
            <div className={styles.header}>
              <h1 className={styles.title}>Loading KYC Form...</h1>
              <p className={styles.subtitle}>
                Please wait while we load your information
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.formCard}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>
              {isEditMode ? "KYC Details" : "Complete Your KYC Verification"}
            </h1>
            <p className={styles.subtitle}>
              {isEditMode
                ? "View and edit your KYC information"
                : "Please provide your information to verify your identity"}
            </p>

            {/* Edit/Save/Cancel buttons for existing data */}
            {isEditMode && (
              <div className={styles.actionButtons}>
                {!isFormEditable ? (
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                ) : (
                  <div className={styles.editActions}>
                    <button
                      type="button"
                      onClick={handleSaveClick}
                      className={styles.saveButton}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelClick}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Scrollable Form Content */}
          <div className={styles.scrollableContent}>
            <form onSubmit={handleSubmit} className={styles.form}>
              {error && <div className={styles.errorMessage}>{error}</div>}

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
                        disabled={!isFormEditable}
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
                        disabled={!isFormEditable}
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
                      disabled={!isFormEditable}
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
                        disabled={!isFormEditable}
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
                        disabled={!isFormEditable}
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
                          disabled={!isFormEditable}
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

              {/* Submit Button - only show when form is editable */}
              {isFormEditable && (
                <div className={styles.submitContainer}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitButton}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : isEditMode
                      ? "Resubmit KYC Application"
                      : "Submit KYC Application"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycFormNew;
