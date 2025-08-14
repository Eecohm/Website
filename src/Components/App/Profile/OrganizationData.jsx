import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/OrgCard.module.css";
import axios from "axios";
import { useBaseUrl } from '../../../BaseUrlContext';
import { useAuth } from "../Login/Auth/AuthContext";
import { FaPhone, FaMobileAlt, FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const OrganizationData = () => {
  const baseUrl = useBaseUrl();
  const token = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/org/orgs`, {
          headers: { Authorization: `Bearer ${token.token}` },
        });
        if (response.status === 200) {
          setFormData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const openModal = (imgUrl) => setModalImage(imgUrl);
  const closeModal = () => setModalImage(null);
  const handleBack = () => navigate("/dashboard/profile");

  return (
    <div className={styles.maindiv}>
      {/* Back Button */}
      <button className={styles.backButton} onClick={handleBack}>
        <FaArrowLeft /> Back
      </button>

      {/* Card */}
      <div className={styles.card}>
        {formData.logoUrl && (
          <div className={styles.logoContainer}>
            <img src={formData.logoUrl} alt="Organization Logo" className={styles.logo} />
          </div>
        )}

        <h1 className={styles.title}>{formData.orgName}</h1>

        <p className={styles.detail}><FaPhone /> {formData.telPhoneNo}</p>
        <p className={styles.detail}><FaMobileAlt /> {formData.phoneNo}</p>
        <p className={styles.detail}><FaEnvelope /> {formData.emailAddress}</p>
        <p className={styles.detail}><strong>Address:</strong> {formData.orgAddress}</p>
        <p className={styles.detail}><strong>PAN Number:</strong> {formData.panNumber}</p>
        <p className={styles.detail}><strong>VAT Number:</strong> {formData.vatNumber}</p>

        <div className={styles.imageRow}>
          {[
            { key: "panImage", label: "PAN Image" },
            { key: "registrationImage", label: "Registration Image" },
            { key: "vatImage", label: "VAT Image" },
          ].map(({ key, label }) =>
            formData[key] ? (
              <div key={key} className={styles.imageGroup}>
                <p>{label}</p>
                <img
                  src={formData[key]}
                  alt={label}
                  onClick={() => openModal(formData[key])}
                  className={styles.imageThumb}
                />
              </div>
            ) : null
          )}
        </div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>✕</button>
            <img src={modalImage} alt="Preview" className={styles.modalImage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationData;
