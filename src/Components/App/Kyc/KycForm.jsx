// src/Components/App/Kyc/KycForm.jsx
import React, { useState } from "react";
// import { useAuth } from "../Login/Auth/AuthContext";
// import styles from "./KycForm.module.css";
import { useNavigate } from "react-router-dom";
// import NavBar from "../NavBar/NavBar";

const KycForm = ({ onSuccess }) => {
  // const { userId } = useAuth();
  const navigate = useNavigate();
  console.log("KycForm component rendering");
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    address: "",
    idType: "national_id",
    idNumber: "",
    role: "", // This will be selected by the user
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate role selection
    if (!formData.role) {
      setError("Please select your role");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          submitData.append(key, formData[key]);
        }
      });
      submitData.append("userId", userId);

      const response = await fetch("/api/kyc/submit", {
        method: "POST",
        body: submitData,
      });

      if (response.ok) {
        // Update local storage and trigger success
        localStorage.setItem("kycStatus", "pending");
        navigate("/kyc/status");
        // onSuccess();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h2>Complete Your KYC Verification</h2>
        <p>Please provide the required information to verify your identity.</p>

        <form onSubmit={handleSubmit}>
          {/* Role Selection - This is the key addition */}
          <div>
            <label>Select Your Role *</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
              className={!formData.role ? styles.requiredField : ""}
            >
              <option value="">Select your role</option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          {/* Existing form fields */}
          <div className={styles.formGroup}>
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Date of Birth *</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              rows="3"
            />
          </div>

          <div className={styles.formGroup}>
            <label>ID Type *</label>
            <select
              name="idType"
              value={formData.idType}
              onChange={handleInputChange}
              required
            >
              <option value="national_id">National ID</option>
              <option value="passport">Passport</option>
              <option value="driver_license">Driver's License</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>ID Number *</label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* File upload fields */}
          <div className={styles.formGroup}>
            <label>ID Front Image *</label>
            <input
              type="file"
              name="idFront"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>ID Back Image</label>
            <input
              type="file"
              name="idBack"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Selfie with ID *</label>
            <input
              type="file"
              name="selfie"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>

          {error && <div style={{ color: "#e74c3c" }}>{error}</div>}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: "#27ae60",
              color: "white",
              padding: "0.75rem",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit Verification"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default KycForm;
