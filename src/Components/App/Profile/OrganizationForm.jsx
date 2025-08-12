import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/OrgFrom.module.css";
import axios from "axios";
import { useBaseUrl } from "../../../BaseUrlContext";
import { useAuth } from "../Login/Auth/AuthContext";
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

const OrganizationForm = () => {
  const token = useAuth();
  const baseUrl = useBaseUrl();
  const navigate = useNavigate();

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
      alert("Please correct the errors before submitting.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "vatImage" || value) {
        data.append(key, typeof value === 'string' ? value.trim() : value);
      }
    });

    try {
      await axios.post(`${baseUrl}/org/orgs/`, data, {
        headers: {
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Success");
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <>
      <div
        className={styles.backButton}
        onClick={handleCancel}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleCancel()}
      />

      <div className={styles.formContainer}>
        <h2>Organization Details</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Organization Name:</label>
            <input
              type="text"
              name="orgName"
              value={formData.orgName}
              onChange={handleChange}
              className={fieldTouched.orgName && !fieldValid.orgName ? styles.inputError : ""}
              required
            />
            {fieldTouched.orgName && !fieldValid.orgName && formData.orgName.trim() !== "" && (
              <p className={styles.errorMessage}>Only alphabets and spaces allowed.</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Organization Address:</label>
            <input
              type="text"
              name="orgAddress"
              value={formData.orgAddress}
              onChange={handleChange}
              className={fieldTouched.orgAddress && !fieldValid.orgAddress ? styles.inputError : ""}
              required
            />
            {fieldTouched.orgAddress && !fieldValid.orgAddress && formData.orgAddress.trim() !== "" && (
              <p className={styles.errorMessage}>Only letters, ",", "-", and spaces allowed.</p>
            )}
          </div>

          <div className={styles.formRowGroup}>
            <div className={styles.formGroup}>
              <label>Telephone Number:</label>
              <input
                type="text"
                name="telPhoneNo"
                value={formData.telPhoneNo}
                onChange={handleChange}
                className={fieldTouched.telPhoneNo && !fieldValid.telPhoneNo ? styles.inputError : ""}
                required
              />
              {fieldTouched.telPhoneNo && !fieldValid.telPhoneNo && (
                <p className={styles.errorMessage}>Invalid telephone number.</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Phone Number:</label>
              <input
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                className={fieldTouched.phoneNo && !fieldValid.phoneNo ? styles.inputError : ""}
                required
              />
              {fieldTouched.phoneNo && !fieldValid.phoneNo && (
                <p className={styles.errorMessage}>Invalid phone number.</p>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Email Address:</label>
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formRowGroup}>
            <div className={styles.formGroup}>
              <label>PAN Number:</label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>VAT Number:</label>
              <input
                type="text"
                name="vatNumber"
                value={formData.vatNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.imageUploadRow}>
            {Object.entries({
              logoUrl: "Logo",
              panImage: "PAN Image",
              registrationImage: "Registration Image",
              vatImage: "VAT Image",
            }).map(([key, label]) => (
              <div className={styles.imageUploadGroup} key={key}>
                <label>{label}:</label>
                <input
                  type="file"
                  name={key}
                  onChange={handleImageChange}
                  accept="image/*"
                  required={key !== "vatImage"}
                />
                {imageErrors[key] && <p className={styles.errorMessage}>{imageErrors[key]}</p>}
                {previewImages[key] && (
                  <img
                    src={previewImages[key]}
                    alt={`${label} Preview`}
                    className={styles.imagePreviewBox}
                  />
                )}
              </div>
            ))}
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default OrganizationForm;
