import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./styles/Profile.module.css";

const OrganizationData = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    orgName: "Acme Corporation",
    orgAddress: "1234 Elm Street, Springfield",
    telPhoneNo: "01-5551234",
    phoneNo: "9801234567",
    emailAddress: "info@acme.com",
    logoUrl: null,
    panNumber: "123456789",
    vatNumber: "987654321",
    panImage: null,
    registrationImage: null,
    vatImage: null,
  });

  const [previewImages, setPreviewImages] = useState({
    logoUrl: null,
    panImage: null,
    registrationImage: null,
    vatImage: null,
  });

  // New state for modal image view
  const [viewedImage, setViewedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const convertFileToBase64 = (file) => {
      return new Promise((resolve) => {
        if (!file) {
          resolve(null);
          return;
        }
        if (typeof file === "string") {
          // Already a base64 string or URL
          resolve(file);
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    };

    const processImages = async () => {
      if (location.state && location.state.formData) {
        const data = location.state.formData;
        setFormData(data);

        const logoUrl = await convertFileToBase64(data.logoUrl);
        const panImage = await convertFileToBase64(data.panImage);
        const registrationImage = await convertFileToBase64(
          data.registrationImage
        );
        const vatImage = await convertFileToBase64(data.vatImage);

        setPreviewImages({
          logoUrl,
          panImage,
          registrationImage,
          vatImage,
        });
      }
    };

    processImages();
  }, [location.state]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Do you really want to delete this data?"
    );
    if (confirmDelete) {
      // Delete logic here
      navigate("/dashboard/profile", { replace: true });
    }
  };

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleViewImage = (imageType) => {
    if (previewImages[imageType]) {
      setViewedImage(previewImages[imageType]);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setViewedImage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      <div className={styles.dataContainer}>
        <h2>Organization Details</h2>

        {isEditing ? (
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className={styles.formGroup}>
              <label>Organization Name</label>
              <input
                type="text"
                name="orgName"
                value={formData.orgName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Organization Address</label>
              <input
                type="text"
                name="orgAddress"
                value={formData.orgAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Telephone Number</label>
                <input
                  type="text"
                  name="telPhoneNo"
                  value={formData.telPhoneNo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Mobile Number</label>
                <input
                  type="text"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                required
              />
            </div>

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

            <div className={styles.formGroup}>
              <label>Logo</label>
              <input
                type="file"
                name="logoUrl"
                onChange={handleImageChange}
                accept="image/*"
              />
              {previewImages.logoUrl && (
                <img
                  src={previewImages.logoUrl}
                  alt="Logo Preview"
                  className={styles.imagePreview}
                />
              )}
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
                {previewImages.panImage && (
                  <img
                    src={previewImages.panImage}
                    alt="PAN Preview"
                    className={styles.imagePreview}
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
                {previewImages.registrationImage && (
                  <img
                    src={previewImages.registrationImage}
                    alt="Registration Preview"
                    className={styles.imagePreview}
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
                {previewImages.vatImage && (
                  <img
                    src={previewImages.vatImage}
                    alt="VAT Preview"
                    className={styles.imagePreview}
                  />
                )}
              </div>
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
        ) : (
          <>
            {previewImages.logoUrl && (
              <div className={styles.logoContainer}>
                <img
                  src={previewImages.logoUrl}
                  alt="Organization Logo"
                  className={styles.logoImageRounded}
                  onClick={() => handleViewImage("logoUrl")}
                />
              </div>
            )}

            <div className={styles.dataDisplay}>
              <div className={styles.dataRow}>
                <span>Organization Name:</span>
                <span>{formData.orgName}</span>
              </div>

              <div className={styles.dataRow}>
                <span>Address:</span>
                <span>{formData.orgAddress}</span>
              </div>

              <div className={styles.dataRow}>
                <span>Telephone:</span>
                <span>{formData.telPhoneNo}</span>
              </div>

              <div className={styles.dataRow}>
                <span>Mobile:</span>
                <span>{formData.phoneNo}</span>
              </div>

              <div className={styles.dataRow}>
                <span>Email:</span>
                <span>{formData.emailAddress}</span>
              </div>

              <div className={styles.dataRow}>
                <span>PAN Number:</span>
                <span>{formData.panNumber}</span>
              </div>

              <div className={styles.dataRow}>
                <span>VAT Number:</span>
                <span>{formData.vatNumber}</span>
              </div>
            </div>

            <div className={styles.imageRow}>
              {previewImages.panImage && (
                <div className={styles.imageContainer}>
                  <img
                    src={previewImages.panImage}
                    alt="PAN Image"
                    className={styles.imageThumbnail}
                    onClick={() => handleViewImage("panImage")}
                  />
                </div>
              )}

              {previewImages.registrationImage && (
                <div className={styles.imageContainer}>
                  <img
                    src={previewImages.registrationImage}
                    alt="Registration Image"
                    className={styles.imageThumbnail}
                    onClick={() => handleViewImage("registrationImage")}
                  />
                </div>
              )}

              {previewImages.vatImage && (
                <div className={styles.imageContainer}>
                  <img
                    src={previewImages.vatImage}
                    alt="VAT Image"
                    className={styles.imageThumbnail}
                    onClick={() => handleViewImage("vatImage")}
                  />
                </div>
              )}
            </div>

            <div className={styles.buttonGroup}>
              <button onClick={handleEdit} className={styles.editButton}>
                Edit
              </button>
              <button onClick={handleDelete} className={styles.deleteButton}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal for viewing image */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <img src={viewedImage} alt="Viewed" className={styles.modalImage} />
          </div>
        </div>
      )}
    </>
  );
};

export default OrganizationData;
