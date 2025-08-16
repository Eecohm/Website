import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles/SubOrgDetails.module.css";
import axios from "axios";
import { useBaseUrl } from "../../../BaseUrlContext";
import { useAuth } from "../Login/Auth/AuthContext";
import ModalNotification from "../../../GlobalComponets/ModalNotification";

const SubOrgDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const baseUrl = useBaseUrl();
  const token = useAuth();

  const [subOrgData, setSubOrgData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [changedFiles, setChangedFiles] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "", // "success" or "error"
    navigateTo: "", // optional redirect
  });

  useEffect(() => {
    const fetchSubOrg = async () => {
      try {
        const response = await axios.get(`${baseUrl}/org/suborgs/${id}/`, {
          headers: { Authorization: `Bearer ${token.token}` },
        });
        setSubOrgData(response.data);
        setFormData(response.data);
      } catch (err) {
        console.error("Failed to fetch sub-organization:", err);
      }
    };
    fetchSubOrg();
  }, [id, baseUrl, token]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (files && files[0]) {
      setChangedFiles((prev) => ({ ...prev, [name]: true }));
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    setErrors({});

    try {
      const form = new FormData();
      const imageFields = ["logo", "panImage", "registrationImage", "vatImage"];

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          if (imageFields.includes(key)) {
            if (formData[key] instanceof File && changedFiles[key]) {
              form.append(key, formData[key]);
            }
          } else {
            if (typeof formData[key] === "boolean") {
              form.append(key, formData[key].toString());
            } else {
              form.append(key, formData[key]);
            }
          }
        }
      });

      const response = await axios.put(`${baseUrl}/org/suborgs/${id}/`, form, {
        headers: {
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setSubOrgData(response.data);
        setFormData(response.data);
        setChangedFiles({});
        setEditMode(false);

        // Show success notification
        setNotification({
          show: true,
          message: "Sub-Organization updated successfully!",
          type: "success",
          
        });
      }
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
        console.error("Validation errors:", err.response.data);
      } else {
        console.error("Update error:", err);
        setNotification({
          show: true,
          message: "Failed to update sub-organization. Please try again.",
          type: "error",
          navigateTo: "",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(subOrgData);
    setChangedFiles({});
    setErrors({});
    setEditMode(false);
  };

  const handleNotificationClose = () => {
    setNotification((prev) => ({ ...prev, show: false }));
    if (notification.type === "success" && notification.navigateTo) {
      navigate(notification.navigateTo);
    }
  };

  if (!subOrgData) return <div className={styles.loading}>Loading...</div>;

  const renderImage = (field, label) => {
    const currentValue = formData[field];
    const displaySrc =
      currentValue instanceof File ? URL.createObjectURL(currentValue) : currentValue || "/default-logo.png";

    const hasError = errors[field];

    return (
      <div className={styles.imageGroup}>
        <label className={styles.imageLabel}>{label}</label>
        <div className={styles.imageUploadContainer}>
          <div className={styles.imagePreview}>
            <img src={displaySrc} alt={label} className={styles.thumbnail} onClick={() => setModalImage(displaySrc)} />
          </div>
          <div className={styles.fileInputContainer}>
            <input
              type="file"
              name={field}
              onChange={handleChange}
              accept="image/*"
              className={styles.fileInput}
              id={`${field}-input`}
            />
            <label htmlFor={`${field}-input`} className={styles.fileInputLabel}>
              Change File
            </label>
            {currentValue instanceof File && <span className={styles.fileName}>{currentValue.name}</span>}
          </div>
        </div>
        {hasError && <div className={styles.errorMessage}>{Array.isArray(hasError) ? hasError.join(", ") : hasError}</div>}
      </div>
    );
  };

  const renderFormField = (name, label, type = "text", required = false) => {
    const hasError = errors[name];
    return (
      <div className={styles.formGroup}>
        <label className={styles.fieldLabel}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
        {type === "textarea" ? (
          <textarea
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            className={`${styles.formControl} ${hasError ? styles.error : ""}`}
            rows={4}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            className={`${styles.formControl} ${hasError ? styles.error : ""}`}
          />
        )}
        {hasError && <div className={styles.errorMessage}>{Array.isArray(hasError) ? hasError.join(", ") : hasError}</div>}
      </div>
    );
  };

  return (
    <div className={styles.wholeDiv}>
      {notification.show && (
        <ModalNotification message={notification.message} type={notification.type} onClose={handleNotificationClose} />
      )}

      <div
        className={styles.backButton}
        onClick={() => navigate("/dashboard/profile/sub-organization")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && navigate("/dashboard/profile/sub-organization")}
      >
        ← BACK
      </div>

      <div className={styles.container}>
        <h2>Sub-Organization Details</h2>

        {!editMode ? (
          <div className={styles.cardView}>
            <img src={subOrgData.logo || "/default-logo.png"} alt={subOrgData.subOrgName || "Organization Logo"} className={styles.logo} />
            <h3>{subOrgData.subOrgName}</h3>
            <p>{subOrgData.descriptionText}</p>

            {subOrgData.differentEntity && (
              <div className={styles.entityDetails}>
                <p>
                  <strong>PAN:</strong> {subOrgData.panNumber}
                </p>
                <p>
                  <strong>VAT:</strong> {subOrgData.vatNumber}
                </p>
                <div className={styles.images}>
                  {subOrgData.panImage && <img src={subOrgData.panImage} alt="PAN Document" onClick={() => setModalImage(subOrgData.panImage)} />}
                  {subOrgData.registrationImage && (
                    <img src={subOrgData.registrationImage} alt="Registration Document" onClick={() => setModalImage(subOrgData.registrationImage)} />
                  )}
                  {subOrgData.vatImage && <img src={subOrgData.vatImage} alt="VAT Document" onClick={() => setModalImage(subOrgData.vatImage)} />}
                </div>
              </div>
            )}
            <button className={styles.editButton} onClick={() => setEditMode(true)}>
              Edit
            </button>
          </div>
        ) : (
          <div className={styles.formView}>
            <div className={styles.formRow}>
              {renderFormField("subOrgName", "Sub-Organization Name", "text", true)}
              {renderFormField("descriptionText", "Description", "textarea")}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="differentEntity" checked={formData.differentEntity || false} onChange={handleChange} className={styles.checkbox} />
                <span className={styles.checkboxText}>Different Entity</span>
              </label>
            </div>

            {formData.differentEntity && (
              <div className={styles.formRow}>
                {renderFormField("panNumber", "PAN Number")}
                {renderFormField("vatNumber", "VAT Number")}
              </div>
            )}

            <div className={styles.imageSection}>
              {renderImage("logo", "Logo")}
              {formData.differentEntity && (
                <>
                  {renderImage("panImage", "PAN Image")}
                  {renderImage("registrationImage", "Registration Image")}
                  {renderImage("vatImage", "VAT Image")}
                </>
              )}
            </div>

            <div className={styles.buttonGroup}>
              <button onClick={handleCancel} className={styles.cancelButton} disabled={loading}>
                Cancel
              </button>
              <button onClick={handleUpdate} disabled={loading} className={styles.saveButton}>
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div className={styles.modal} onClick={() => setModalImage(null)}>
          <span className={styles.closeModal} onClick={() => setModalImage(null)}>
            ×
          </span>
          <img src={modalImage} alt="Full view" className={styles.modalContent} />
        </div>
      )}
    </div>
  );
};

export default SubOrgDetails;
