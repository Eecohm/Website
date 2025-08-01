import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Profile.module.css";
import axios from "axios";
import { useBaseUrl } from "../../../BaseUrlContext";
import { ImOpera } from "react-icons/im";
import { useAuth } from "../Login/Auth/AuthContext";
const OrganizationForm = () => {
  const token = useAuth()
  const baseUrl = useBaseUrl();
  const [Loading, setLoading] = useState(true)
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
  const [OrgData, setOrgData] = useState([])
  useEffect(() => {
  console.log(token)
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/org/orgs`);
      console.log(response.data); 
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData(); 
}, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("orgName", formData.orgName);
    data.append("orgAddress", formData.orgAddress);
    data.append("telPhoneNo", formData.telPhoneNo);
    data.append("phoneNo", formData.phoneNo);
    data.append("emailAddress", formData.emailAddress);
    data.append("panNumber", formData.panNumber);
    data.append("vatNumber", formData.vatNumber);

    if (formData.logoUrl) data.append("logoUrl", formData.logoUrl);
    if (formData.panImage) data.append("panImage", formData.panImage);
    if (formData.registrationImage) data.append("registrationImage", formData.registrationImage);
    if (formData.vatImage) data.append("vatImage", formData.vatImage);

    try {
      const response = await axios.post(
        `${baseUrl}/org/orgs/`,
        data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
    });
    console.log("Sucess");
    } catch (error) {
      console.error('Upload error:', error);
    }
  }

  const [previewImages, setPreviewImages] = useState({
    logoUrl: null,
    panImage: null,
    registrationImage: null,
    vatImage: null,
  });

  const navigate = useNavigate();

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
        <h2>Organization Details</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
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
              required
            />
            {previewImages.logoUrl && (
              <img
                src={previewImages.logoUrl}
                alt="Logo Preview"
                className={styles.imagePreview}
                onClick={() => handleViewImage("logoUrl")}
                required
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
                required
              />
              {previewImages.panImage && (
                <img
                  src={previewImages.panImage}
                  alt="PAN Preview"
                  className={styles.imagePreview}
                  onClick={() => handleViewImage("panImage")}
                  required
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
                required
              />
              {previewImages.registrationImage && (
                <img
                  src={previewImages.registrationImage}
                  alt="Registration Preview"
                  className={styles.imagePreview}
                  onClick={() => handleViewImage("registrationImage")}
                  required
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
                  onClick={() => handleViewImage("vatImage")}
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
      </div>
    </>
  );
};

export default OrganizationForm;
