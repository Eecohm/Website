import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/OrgCard.module.css";
import axios from "axios";
import { useBaseUrl } from '../../../BaseUrlContext';
import { useAuth } from "../Login/Auth/AuthContext";
import { 
  FiPhone, 
  FiSmartphone, 
  FiMail, 
  FiArrowLeft,
  FiMapPin,
  FiFileText,
  FiCreditCard,
  FiHome,
  FiEye,
  FiX,
  FiImage,
  FiZoomIn,
  FiDownload,
  FiInfo
} from 'react-icons/fi';

const OrganizationData = () => {
  const baseUrl = useBaseUrl();
  const token = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [modalImage, setModalImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/org/orgs`, {
          headers: { Authorization: `Bearer ${token.token}` },
        });
        if (response.status === 200) {
          setFormData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Failed to load organization data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [baseUrl, token]);

  const openModal = (imgUrl) => setModalImage(imgUrl);
  const closeModal = () => setModalImage(null);
  const handleBack = () => navigate("/dashboard/profile");

  const downloadImage = (imageUrl, filename) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className={styles.maindiv}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading organization data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.maindiv}>
        <div className={styles.errorContainer}>
          <FiInfo className={styles.errorIcon} />
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className={styles.retryBtn}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.maindiv}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <FiArrowLeft className={styles.btnIcon} />
          Back to Profile
        </button>
        <div className={styles.headerTitle}>
          <FiHome className={styles.headerIcon} />
          <h1>Organization Details</h1>
        </div>
      </div>

      {/* Business Card Layout */}
      <div className={styles.businessCard}>
        {/* Left Side - Details */}
        <div className={styles.cardDetails}>
          <h2 className={styles.orgName}>{formData.orgName || "Organization Name"}</h2>
          
          {/* Contact Info */}
          <div className={styles.contactSection}>
            {formData.telPhoneNo && (
              <div className={styles.contactItem}>
                <FiPhone className={styles.contactIcon} />
                <span>{formData.telPhoneNo}</span>
              </div>
            )}
            
            {formData.phoneNo && (
              <div className={styles.contactItem}>
                <FiSmartphone className={styles.contactIcon} />
                <span>{formData.phoneNo}</span>
              </div>
            )}
            
            {formData.emailAddress && (
              <div className={styles.contactItem}>
                <FiMail className={styles.contactIcon} />
                <span>{formData.emailAddress}</span>
              </div>
            )}
            
            {formData.orgAddress && (
              <div className={styles.contactItem}>
                <FiMapPin className={styles.contactIcon} />
                <span>{formData.orgAddress}</span>
              </div>
            )}
          </div>
          
          {/* Legal Info */}
          <div className={styles.legalSection}>
            {formData.panNumber && (
              <div className={styles.legalItem}>
                <FiCreditCard className={styles.legalIcon} />
                <span>PAN: {formData.panNumber}</span>
              </div>
            )}
            
            {formData.vatNumber && (
              <div className={styles.legalItem}>
                <FiFileText className={styles.legalIcon} />
                <span>VAT: {formData.vatNumber}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Side - Logo */}
        {formData.logoUrl && (
          <div className={styles.cardLogo}>
            <div className={styles.logoContainer}>
              <img 
                src={formData.logoUrl} 
                alt="Organization Logo" 
                className={styles.logoImage}
              />
              <div className={styles.logoOverlay}>
                <button 
                  className={styles.logoActionBtn}
                  onClick={() => openModal(formData.logoUrl)}
                >
                  <FiZoomIn />
                </button>
                <button 
                  className={styles.logoActionBtn}
                  onClick={() => downloadImage(formData.logoUrl, 'organization_logo.jpg')}
                >
                  <FiDownload />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Documents Section */}
      <div className={styles.documentsSection}>
        <div className={styles.sectionHeader}>
          <FiImage className={styles.sectionIcon} />
          <h3>Legal Documents</h3>
        </div>
        
        <div className={styles.documentsGrid}>
          {[
            { key: "panImage", label: "PAN Document", icon: FiCreditCard },
            { key: "registrationImage", label: "Registration Document", icon: FiFileText },
            { key: "vatImage", label: "VAT Document", icon: FiFileText },
          ].map(({ key, label, icon: Icon }) =>
            formData[key] ? (
              <div key={key} className={styles.documentCard}>
                <div className={styles.documentHeader}>
                  <Icon className={styles.documentIcon} />
                  <span className={styles.documentLabel}>{label}</span>
                </div>
                
                <div className={styles.documentImageContainer}>
                  <img
                    src={formData[key]}
                    alt={label}
                    className={styles.documentImage}
                  />
                  <div className={styles.documentOverlay}>
                    <button
                      className={styles.documentBtn}
                      onClick={() => openModal(formData[key])}
                      title="View Full Size"
                    >
                      <FiEye />
                    </button>
                    <button
                      className={styles.documentBtn}
                      onClick={() => downloadImage(formData[key], `${label.replace(/\s+/g, '_')}.jpg`)}
                      title="Download Image"
                    >
                      <FiDownload />
                    </button>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>

        {![formData.panImage, formData.registrationImage, formData.vatImage].some(Boolean) && (
          <div className={styles.noDocuments}>
            <FiImage className={styles.noDocumentsIcon} />
            <p>No documents available</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Document Preview</h3>
              <div className={styles.modalActions}>
                <button
                  className={styles.modalActionBtn}
                  onClick={() => downloadImage(modalImage, 'document.jpg')}
                  title="Download"
                >
                  <FiDownload />
                </button>
                <button
                  className={styles.modalCloseBtn}
                  onClick={closeModal}
                  title="Close"
                >
                  <FiX />
                </button>
              </div>
            </div>
            <div className={styles.modalImageContainer}>
              <img src={modalImage} alt="Document Preview" className={styles.modalImage} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationData;