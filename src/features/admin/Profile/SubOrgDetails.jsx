import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Edit3,
  Save,
  X,
  Upload,
  Eye,
  Building2,
  FileText,
  Camera,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import styles from "@/features/admin/Profile/styles/SubOrgDetails.module.css";
import axios from "axios";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import ModalNotification from "../../../components/common/ModalNotification";

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
        // Extract meaningful message from backend response
        const backendMessage = err.response.data.detail ||
          err.response.data.message ||
          err.response.data.non_field_errors?.[0];

        if (backendMessage) {
          setNotification({
            show: true,
            message: backendMessage,
            type: "error",
          });
        }
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

  if (!subOrgData) {
    return (
      <div className={styles.wholeDiv}>
        <div className={styles.loadingContainer}>
          <Loader2 className={styles.loadingSpinner} />
          <p className={styles.loadingText}>Loading organization details...</p>
        </div>
      </div>
    );
  }

  const renderImage = (field, label, icon = Camera) => {
    const currentValue = formData[field];
    const displaySrc =
      currentValue instanceof File
        ? URL.createObjectURL(currentValue)
        : currentValue || "/default-logo.png";

    const hasError = errors[field];
    const IconComponent = icon;

    return (
      <div className={styles.imageGroup}>
        <div className={styles.imageLabel}>
          <IconComponent size={16} />
          <span>{label}</span>
        </div>
        <div className={styles.imageUploadContainer}>
          <div className={styles.imagePreview}>
            <img
              src={displaySrc}
              alt={label}
              className={styles.thumbnail}
              onClick={() => setModalImage(displaySrc)}
            />
            <div
              className={styles.imageOverlay}
              onClick={() => setModalImage(displaySrc)}
            >
              <Eye size={20} />
            </div>
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
              <Upload size={16} />
              <span>Change File</span>
            </label>
            {currentValue instanceof File && (
              <div className={styles.fileName}>
                <FileText size={14} />
                <span>{currentValue.name}</span>
              </div>
            )}
          </div>
        </div>
        {hasError && (
          <div className={styles.errorMessage}>
            <AlertCircle size={14} />
            <span>
              {Array.isArray(hasError) ? hasError.join(", ") : hasError}
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderFormField = (
    name,
    label,
    type = "text",
    required = false,
    icon = null
  ) => {
    const hasError = errors[name];
    const IconComponent = icon;

    return (
      <div className={styles.formGroup}>
        <label className={styles.fieldLabel}>
          {IconComponent && <IconComponent size={16} />}
          <span>{label}</span>
          {required && <span className={styles.required}>*</span>}
        </label>
        {type === "textarea" ? (
          <textarea
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            className={`${styles.formControl} ${hasError ? styles.error : ""}`}
            rows={4}
            placeholder={`Enter ${label.toLowerCase()}...`}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            className={`${styles.formControl} ${hasError ? styles.error : ""}`}
            placeholder={`Enter ${label.toLowerCase()}...`}
          />
        )}
        {hasError && (
          <div className={styles.errorMessage}>
            <AlertCircle size={14} />
            <span>
              {Array.isArray(hasError) ? hasError.join(", ") : hasError}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.wholeDiv}>
      {notification.show && (
        <ModalNotification
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
        />
      )}

      <div
        className={styles.backButton}
        onClick={() => navigate("/dashboard/profile/sub-organization")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === "Enter" && navigate("/dashboard/profile/sub-organization")
        }
      >
        <ArrowLeft size={18} />
        <span>Back to Sub-Organizations</span>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <Building2 size={28} />
            <h1>Sub-Organization Details</h1>
          </div>
          {!editMode && (
            <button
              className={styles.editButton}
              onClick={() => setEditMode(true)}
            >
              <Edit3 size={18} />
              <span>Edit Details</span>
            </button>
          )}
        </div>

        {!editMode ? (
          <div className={styles.cardView}>
            <div className={styles.cardHeader}>
              <div className={styles.logoContainer}>
                <img
                  src={subOrgData.logo || "/default-logo.png"}
                  alt={subOrgData.subOrgName || "Organization Logo"}
                  className={styles.logo}
                  onClick={() =>
                    setModalImage(subOrgData.logo || "/default-logo.png")
                  }
                />
                <div
                  className={styles.logoOverlay}
                  onClick={() =>
                    setModalImage(subOrgData.logo || "/default-logo.png")
                  }
                >
                  <Eye size={24} />
                </div>
              </div>
              <div className={styles.cardInfo}>
                <h2>{subOrgData.subOrgName}</h2>
                <p className={styles.description}>
                  {subOrgData.descriptionText}
                </p>
                {subOrgData.differentEntity && (
                  <div className={styles.entityBadge}>
                    <CheckCircle2 size={16} />
                    <span>Separate Legal Entity</span>
                  </div>
                )}
              </div>
            </div>

            {subOrgData.differentEntity && (
              <div className={styles.entityDetails}>
                <h3>Legal Information</h3>
                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <label>PAN Number</label>
                    <span>{subOrgData.panNumber || "Not provided"}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>VAT Number</label>
                    <span>{subOrgData.vatNumber || "Not provided"}</span>
                  </div>
                </div>

                <div className={styles.documentsSection}>
                  <h4>Documents</h4>
                  <div className={styles.documentGrid}>
                    {subOrgData.panImage && (
                      <div className={styles.documentItem}>
                        <img
                          src={subOrgData.panImage}
                          alt="PAN Document"
                          onClick={() => setModalImage(subOrgData.panImage)}
                        />
                        <div
                          className={styles.documentOverlay}
                          onClick={() => setModalImage(subOrgData.panImage)}
                        >
                          <Eye size={16} />
                          <span>PAN Document</span>
                        </div>
                      </div>
                    )}
                    {subOrgData.registrationImage && (
                      <div className={styles.documentItem}>
                        <img
                          src={subOrgData.registrationImage}
                          alt="Registration Document"
                          onClick={() =>
                            setModalImage(subOrgData.registrationImage)
                          }
                        />
                        <div
                          className={styles.documentOverlay}
                          onClick={() =>
                            setModalImage(subOrgData.registrationImage)
                          }
                        >
                          <Eye size={16} />
                          <span>Registration</span>
                        </div>
                      </div>
                    )}
                    {subOrgData.vatImage && (
                      <div className={styles.documentItem}>
                        <img
                          src={subOrgData.vatImage}
                          alt="VAT Document"
                          onClick={() => setModalImage(subOrgData.vatImage)}
                        />
                        <div
                          className={styles.documentOverlay}
                          onClick={() => setModalImage(subOrgData.vatImage)}
                        >
                          <Eye size={16} />
                          <span>VAT Document</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.formView}>
            <div className={styles.formSection}>
              <h3>Basic Information</h3>
              <div className={styles.formGrid}>
                {renderFormField(
                  "subOrgName",
                  "Sub-Organization Name",
                  "text",
                  true,
                  Building2
                )}
                {renderFormField(
                  "descriptionText",
                  "Description",
                  "textarea",
                  false,
                  FileText
                )}
              </div>
            </div>

            <div className={styles.formSection}>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="differentEntity"
                    checked={formData.differentEntity || false}
                    onChange={handleChange}
                    className={styles.checkbox}
                  />
                  <div className={styles.checkboxIndicator}>
                    {formData.differentEntity && <CheckCircle2 size={16} />}
                  </div>
                  <div className={styles.checkboxContent}>
                    <span className={styles.checkboxTitle}>
                      Different Entity
                    </span>
                    <span className={styles.checkboxDescription}>
                      This sub-organization is a separate legal entity
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {formData.differentEntity && (
              <div className={styles.formSection}>
                <h3>Legal Information</h3>
                <div className={styles.formGrid}>
                  {renderFormField(
                    "panNumber",
                    "PAN Number",
                    "text",
                    false,
                    FileText
                  )}
                  {renderFormField(
                    "vatNumber",
                    "VAT Number",
                    "text",
                    false,
                    FileText
                  )}
                </div>
              </div>
            )}

            <div className={styles.formSection}>
              <h3>Images & Documents</h3>
              <div className={styles.imageGrid}>
                {renderImage("logo", "Organization Logo", Building2)}
                {formData.differentEntity && (
                  <>
                    {renderImage("panImage", "PAN Document", FileText)}
                    {renderImage(
                      "registrationImage",
                      "Registration Document",
                      FileText
                    )}
                    {renderImage("vatImage", "VAT Document", FileText)}
                  </>
                )}
              </div>
            </div>

            <div className={styles.formActions}>
              <button
                onClick={handleCancel}
                className={styles.cancelButton}
                disabled={loading}
              >
                <X size={18} />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className={styles.saveButton}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className={styles.spinning} />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div className={styles.modal} onClick={() => setModalImage(null)}>
          <button
            className={styles.closeModal}
            onClick={() => setModalImage(null)}
          >
            <X size={24} />
          </button>
          <img
            src={modalImage}
            alt="Full view"
            className={styles.modalContent}
          />
        </div>
      )}
    </div>
  );
};

export default SubOrgDetails;
