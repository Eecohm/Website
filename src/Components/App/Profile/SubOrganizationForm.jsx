import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Profile.module.css";

const SubOrganizationForm = () => {
  const [formData, setFormData] = useState({
    subOrgName: "",
    descriptionText: "",
    differentEntity: false,
    panNumber: "",
    vatNumber: "",
    panImage: null,
    registrationImage: null,
    vatImage: null,
  });

  const [previewImages, setPreviewImages] = useState({
    panImage: null,
    registrationImage: null,
    vatImage: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [name]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard/profile/sub-org/1", { state: { formData } });
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

  return (
    <>
      <div
        className={styles.backButton}
        onClick={() => navigate("/dashboard/profile")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            navigate("/dashboard/profile");
          }
        }}
      ></div>

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
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              name="descriptionText"
              value={formData.descriptionText}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>
              <input
                type="checkbox"
                name="differentEntity"
                checked={formData.differentEntity}
                onChange={handleChange}
              />
              Different Entity
            </label>
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
                    required={formData.differentEntity}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>VAT Number</label>
                  <input
                    type="text"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleChange}
                    required={formData.differentEntity}
                  />
                </div>
              </div>

              <div className={styles.imageRow}>
                <div className={styles.imageGroup}>
                  <label>PAN Image</label>
                  <input
                    type="file"
                    name="panImage"
                    onChange={handleImageChange}
                    accept="image/*"
                    required={formData.differentEntity}
                  />
                  {previewImages.panImage && (
                    <img
                      src={previewImages.panImage}
                      alt="PAN Preview"
                      className={styles.imagePreview}
                      onClick={() => handleViewImage("panImage")}
                    />
                  )}
                </div>

                <div className={styles.imageGroup}>
                  <label>Registration Image</label>
                  <input
                    type="file"
                    name="registrationImage"
                    onChange={handleImageChange}
                    accept="image/*"
                    required={formData.differentEntity}
                  />
                  {previewImages.registrationImage && (
                    <img
                      src={previewImages.registrationImage}
                      alt="Registration Preview"
                      className={styles.imagePreview}
                      onClick={() => handleViewImage("registrationImage")}
                    />
                  )}
                </div>

                <div className={styles.imageGroup}>
                  <label>VAT Image</label>
                  <input
                    type="file"
                    name="vatImage"
                    onChange={handleImageChange}
                    accept="image/*"
                    required={formData.differentEntity}
                  />
                  {previewImages.vatImage && (
                    <img
                      src={previewImages.vatImage}
                      alt="VAT Preview"
                      className={styles.imagePreview}
                      onClick={() => handleViewImage("vatImage")}
                    />
                  )}
                </div>
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
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SubOrganizationForm;
