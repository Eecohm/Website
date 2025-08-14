import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/SubOrgForm.module.css";
import axios from "axios";
import { useBaseUrl } from "../../../BaseUrlContext";
import { useAuth } from "../Login/Auth/AuthContext";
import {
  isOnlyAlphabets,
  isValidString,
} from "../../../validators/formInputValidator/TextValidator";
import {
  isJPGFile,
  isPNGFile,
  isFileBelow3MB,
} from "../../../validators/formInputValidator/FileTypeValidator";

const SubOrganizationForm = () => {
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organization: "", // org id
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
  const [fieldErrors, setFieldErrors] = useState({}); // server-side errors
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFieldTouched((prev) => ({ ...prev, [name]: true }));

    let valid = true;
    if (name === "subOrgName") valid = isOnlyAlphabets(value.trim()) || value.trim() === "";
    else if (name === "descriptionText") valid = isValidString(value.trim()) || value.trim() === "";
    else if (name === "panNumber" || name === "vatNumber")
      valid = value.trim().length === 0 || /^[0-9]+$/.test(value.trim());

    setFieldValid((prev) => ({ ...prev, [name]: valid }));
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
  };

  const validateAll = () => {
    const validations = {
      subOrgName: isOnlyAlphabets(formData.subOrgName.trim()),
      descriptionText: isValidString(formData.descriptionText.trim()),
      panNumber:
        !formData.differentEntity || /^[0-9]+$/.test(formData.panNumber.trim()),
      vatNumber: !formData.hasVAT || /^[0-9]+$/.test(formData.vatNumber.trim()),
    };
    setFieldValid(validations);

    const imageValidation = {
      logoImage: formData.logoImage && !imageErrors.logoImage,
      panImage:
        !formData.differentEntity ||
        (formData.panImage && !imageErrors.panImage),
      registrationImage:
        !formData.differentEntity ||
        (formData.registrationImage && !imageErrors.registrationImage),
      vatImage:
        !formData.hasVAT || (formData.vatImage && !imageErrors.vatImage),
    };

    return (
      Object.values(validations).every(Boolean) &&
      Object.values(imageValidation).every(Boolean)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({}); // reset backend errors

    if (!validateAll()) {
      alert("Please correct the errors before submitting.");
      return;
    }

    const fd = new FormData();
    fd.append("organization", formData.organization);
    fd.append("subOrgName", formData.subOrgName);
    fd.append("descriptionText", formData.descriptionText);
    fd.append("differentEntity", formData.differentEntity);
    fd.append("panNumber", formData.panNumber || "");
    fd.append("vatNumber", formData.vatNumber || "");
    if (formData.logoImage) fd.append("logo", formData.logoImage);
    if (formData.panImage) fd.append("panImage", formData.panImage);
    if (formData.registrationImage)
      fd.append("registrationImage", formData.registrationImage);
    if (formData.vatImage) fd.append("vatImage", formData.vatImage);

    setIsSubmitting(true);

    try {
      const res = await axios.post(`${baseUrl}/org/suborgs/`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Sub-Organization created successfully!");
      navigate("/dashboard/profile/sub-org/1");
    } catch (error) {
      if (error.response && error.response.data) {
        setFieldErrors(error.response.data); // maps to serializer field names
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => navigate("/dashboard/profile");

  const handleViewImage = (imageType) => {
    if (previewImages[imageType]) {
      navigate(`/dashboard/profile/view-image/${imageType}`, {
        state: { image: previewImages[imageType] },
      });
    }
  };

  return (
    <div className={styles.wholediv}>
      <div className={styles.backButton} onClick={handleCancel}>
        Back
      </div>

      <div className={styles.formContainer}>
        <h2>Add Sub-Organization</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Sub-Organization Name</label>
            <input
              type="text"
              name="subOrgName"
              value={formData.subOrgName}
              onChange={handleChange}
              className={
                (fieldTouched.subOrgName && !fieldValid.subOrgName) ||
                fieldErrors.subOrgName
                  ? styles.inputError
                  : ""
              }
              required
            />
            {fieldTouched.subOrgName && !fieldValid.subOrgName && (
              <p className={styles.errorMessage}>
                Only alphabets and spaces allowed.
              </p>
            )}
            {fieldErrors.subOrgName && (
              <p className={styles.errorMessage}>{fieldErrors.subOrgName}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              name="descriptionText"
              value={formData.descriptionText}
              onChange={handleChange}
              className={
                (fieldTouched.descriptionText && !fieldValid.descriptionText) ||
                fieldErrors.descriptionText
                  ? styles.inputError
                  : ""
              }
              required
            />
            {fieldTouched.descriptionText && !fieldValid.descriptionText && (
              <p className={styles.errorMessage}>
                Only letters, numbers, spaces, and punctuation allowed.
              </p>
            )}
            {fieldErrors.descriptionText && (
              <p className={styles.errorMessage}>
                {fieldErrors.descriptionText}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>
              <input
                type="checkbox"
                name="differentEntity"
                checked={formData.differentEntity}
                onChange={handleChange}
              />{" "}
              Different Entity
            </label>
          </div>

          <div className={styles.formGroup}>
            <label>
              <input
                type="checkbox"
                name="hasVAT"
                checked={formData.hasVAT}
                onChange={handleChange}
              />{" "}
              Has VAT
            </label>
          </div>

          <div className={styles.imageRow}>
            <div className={styles.imageGroup}>
              <label>Logo Image (Required)</label>
              <input
                type="file"
                name="logoImage"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
              {imageErrors.logoImage && (
                <p className={styles.errorMessage}>{imageErrors.logoImage}</p>
              )}
              {fieldErrors.logo && (
                <p className={styles.errorMessage}>{fieldErrors.logo}</p>
              )}
              {previewImages.logoImage && (
                <img
                  src={previewImages.logoImage}
                  alt="logo preview"
                  className={styles.imagePreview}
                  onClick={() => handleViewImage("logoImage")}
                />
              )}
            </div>
          </div>

          {formData.differentEntity && (
            <>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>PAN Number</label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    className={
                      (fieldTouched.panNumber && !fieldValid.panNumber) ||
                      fieldErrors.panNumber
                        ? styles.inputError
                        : ""
                    }
                    required
                  />
                  {fieldTouched.panNumber && !fieldValid.panNumber && (
                    <p className={styles.errorMessage}>
                      Only numeric values allowed.
                    </p>
                  )}
                  {fieldErrors.panNumber && (
                    <p className={styles.errorMessage}>
                      {fieldErrors.panNumber}
                    </p>
                  )}
                </div>

                {formData.hasVAT && (
                  <div className={styles.formGroup}>
                    <label>VAT Number</label>
                    <input
                      type="text"
                      name="vatNumber"
                      value={formData.vatNumber}
                      onChange={handleChange}
                      className={
                        (fieldTouched.vatNumber && !fieldValid.vatNumber) ||
                        fieldErrors.vatNumber
                          ? styles.inputError
                          : ""
                      }
                      required
                    />
                    {fieldTouched.vatNumber && !fieldValid.vatNumber && (
                      <p className={styles.errorMessage}>
                        Only numeric values allowed.
                      </p>
                    )}
                    {fieldErrors.vatNumber && (
                      <p className={styles.errorMessage}>
                        {fieldErrors.vatNumber}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className={styles.imageRow}>
                {["panImage", "registrationImage", "vatImage"].map(
                  (imgType) =>
                    (imgType !== "vatImage" || formData.hasVAT) && (
                      <div className={styles.imageGroup} key={imgType}>
                        <label>{imgType.replace("Image", " Image")}</label>
                        <input
                          type="file"
                          name={imgType}
                          onChange={handleImageChange}
                          accept="image/*"
                          required
                        />
                        {imageErrors[imgType] && (
                          <p className={styles.errorMessage}>
                            {imageErrors[imgType]}
                          </p>
                        )}
                        {fieldErrors[imgType] && (
                          <p className={styles.errorMessage}>
                            {fieldErrors[imgType]}
                          </p>
                        )}
                        {previewImages[imgType] && (
                          <img
                            src={previewImages[imgType]}
                            alt={`${imgType} preview`}
                            className={styles.imagePreview}
                            onClick={() => handleViewImage(imgType)}
                          />
                        )}
                      </div>
                    )
                )}
              </div>
            </>
          )}

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubOrganizationForm;
