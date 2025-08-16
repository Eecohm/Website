import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Profile.module.css";
import ModalNotification from "../Common/ModalNotification"; // ensure correct import path

const SubOrganizationCard = ({ data, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(data);

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "", // success or error
    navigateTo: "", // optional path to navigate after close
  });

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
    }
  };

  const handleViewImage = (imageType) => {
    if (formData[imageType]) {
      navigate(`/dashboard/profile/view-image/${imageType}`, {
        state: { image: formData[imageType] },
      });
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    onEdit(formData);

    // Show success notification
    setNotification({
      show: true,
      message: "Sub-Organization updated successfully!",
      type: "success",
      navigateTo: "/dashboard/profile/sub-organization",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(data);
  };

  const handleDelete = () => {
    onDelete();
    setNotification({
      show: true,
      message: "Sub-Organization deleted successfully!",
      type: "success",
      navigateTo: "/dashboard/profile/sub-organization",
    });
  };

  const handleNotificationClose = () => {
    setNotification((prev) => ({ ...prev, show: false }));
    if (notification.type === "success" && notification.navigateTo) {
      navigate(notification.navigateTo);
    }
  };

  return (
    <div className={styles.subOrgCard}>
      {notification.show && (
        <ModalNotification
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
        />
      )}

      {isEditing ? (
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
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
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>VAT Number</label>
                  <input
                    type="text"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleChange}
                    required
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
                  />
                  {formData.panImage && (
                    <img
                      src={
                        typeof formData.panImage === "string"
                          ? formData.panImage
                          : URL.createObjectURL(formData.panImage)
                      }
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
                  />
                  {formData.registrationImage && (
                    <img
                      src={
                        typeof formData.registrationImage === "string"
                          ? formData.registrationImage
                          : URL.createObjectURL(formData.registrationImage)
                      }
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
                  />
                  {formData.vatImage && (
                    <img
                      src={
                        typeof formData.vatImage === "string"
                          ? formData.vatImage
                          : URL.createObjectURL(formData.vatImage)
                      }
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
      ) : (
        <div className={styles.dataDisplay}>
          <div className={styles.dataRow}>
            <span>Sub-Organization Name:</span>
            <span>{formData.subOrgName}</span>
          </div>

          <div className={styles.dataRow}>
            <span>Description:</span>
            <span>{formData.descriptionText}</span>
          </div>

          <div className={styles.dataRow}>
            <span>Different Entity:</span>
            <span>{formData.differentEntity ? "Yes" : "No"}</span>
          </div>

          {formData.differentEntity && (
            <>
              <div className={styles.dataRow}>
                <span>PAN Number:</span>
                <span>{formData.panNumber}</span>
              </div>

              <div className={styles.dataRow}>
                <span>VAT Number:</span>
                <span>{formData.vatNumber}</span>
              </div>

              <div className={styles.imageRow}>
                {formData.panImage && (
                  <div className={styles.imageContainer}>
                    <span>PAN:</span>
                    <img
                      src={
                        typeof formData.panImage === "string"
                          ? formData.panImage
                          : URL.createObjectURL(formData.panImage)
                      }
                      alt="PAN Image"
                      className={styles.imageThumbnail}
                      onClick={() => handleViewImage("panImage")}
                    />
                  </div>
                )}

                {formData.registrationImage && (
                  <div className={styles.imageContainer}>
                    <span>Registration:</span>
                    <img
                      src={
                        typeof formData.registrationImage === "string"
                          ? formData.registrationImage
                          : URL.createObjectURL(formData.registrationImage)
                      }
                      alt="Registration Image"
                      className={styles.imageThumbnail}
                      onClick={() => handleViewImage("registrationImage")}
                    />
                  </div>
                )}

                {formData.vatImage && (
                  <div className={styles.imageContainer}>
                    <span>VAT:</span>
                    <img
                      src={
                        typeof formData.vatImage === "string"
                          ? formData.vatImage
                          : URL.createObjectURL(formData.vatImage)
                      }
                      alt="VAT Image"
                      className={styles.imageThumbnail}
                      onClick={() => handleViewImage("vatImage")}
                    />
                  </div>
                )}
              </div>
            </>
          )}

          <div className={styles.buttonGroup}>
            <button
              onClick={() => setIsEditing(true)}
              className={styles.editButton}
            >
              Edit
            </button>
            <button onClick={handleDelete} className={styles.deleteButton}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubOrganizationCard;
