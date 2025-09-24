import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/SubOrg.module.css";
import axios from "axios";
import { useBaseUrl } from "../../../Context/BaseUrlContext";
import { useAuth } from "../../../Context/AuthContext";

const SubOrganizationData = () => {
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const token = useAuth();
  const [subOrgs, setSubOrgs] = useState([]);

  useEffect(() => {
    const fetchSubOrgs = async () => {
      try {
        const response = await axios.get(`${baseUrl}/org/suborgs`, {
          headers: { Authorization: `Bearer ${token.token}` },
        });
        if (response.status === 200) {
          setSubOrgs(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch sub-organizations", error);
      }
    };
    fetchSubOrgs();
  }, [baseUrl, token]);

  const handleAddNew = () => {
    navigate("/dashboard/profile/add-sub-organization");
  };

  const handleViewDetails = async (subOrgId) => {
    try {
      const response = await axios.get(`${baseUrl}/org/suborgs/${subOrgId}/`, {
        headers: { Authorization: `Bearer ${token.token}` },
      });
      if (response.status === 200) {
        navigate(`/dashboard/profile/suborg-details/${subOrgId}`, {
          state: { subOrg: response.data },
        });
      }
    } catch (error) {
      console.error("Failed to fetch sub-organization details", error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => navigate("/dashboard/profile")}
        >
          ← Back to Profile
        </button>
        <h1 className={styles.title}>Sub-Organizations</h1>
      </div>

      <div className={styles.gridContainer}>
        {subOrgs.map((subOrg) => (
          <div 
            key={subOrg.id} 
            className={styles.businessCard}
            onClick={() => handleViewDetails(subOrg.id)}
          >
            <div className={styles.cardContent}>
              <div className={styles.cardDetails}>
                <h3 className={styles.orgName}>{subOrg.name}</h3>
                {subOrg.description && (
                  <p className={styles.orgDescription}>{subOrg.description}</p>
                )}
                <div className={styles.metaInfo}>
                  {subOrg.differentEntity && (
                    <span className={styles.entityTag}>Separate Entity</span>
                  )}
                </div>
              </div>
              
              <div className={styles.cardLogo}>
                <img
                  src={subOrg.logo || "/default-logo.png"}
                  alt={subOrg.name}
                  className={styles.logoImage}
                />
              </div>
            </div>
          </div>
        ))}

        <div 
          className={`${styles.businessCard} ${styles.addNewCard}`}
          onClick={handleAddNew}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleAddNew()}
        >
          <div className={styles.addNewContent}>
            <span className={styles.addIcon}>+</span>
            <span className={styles.addText}>Add New Sub-Organization</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubOrganizationData;