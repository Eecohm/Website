// SubOrganizationData.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/SubOrg.module.css";
import axios from "axios";
import { useBaseUrl } from "../../../BaseUrlContext";
import { useAuth } from "../Login/Auth/AuthContext";

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
    <div className={styles.wholeDiv}>
      <div
        className={styles.backButton}
        onClick={() => navigate("/dashboard/profile")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate("/dashboard/profile")}
      >
        ← BACK
      </div>

      <div className={styles.container}>
        <h2>Sub-Organization Details</h2>
        <div className={styles.subOrgList}>
          {subOrgs.map((subOrg) => (
            <div
              key={subOrg.id}
              className={styles.subOrgCard}
              onClick={() => handleViewDetails(subOrg.id)}
            >
              <img
                src={subOrg.logo || "/default-logo.png"}
                alt={subOrg.name}
                className={styles.subOrgLogo}
              />
              <span>{subOrg.name}</span>
            </div>
          ))}

          <div
            className={styles.addNewCard}
            onClick={handleAddNew}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleAddNew()}
          >
            <span className={styles.addIcon}>+</span>
            <span>Add New</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubOrganizationData;
