import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles/Profile.module.css";
import SubOrganizationCard from "./SubOrganizationCard";

const SubOrganizationData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [savedSubOrgs, setSavedSubOrgs] = useState([]);

  useEffect(() => {
    if (location.state && location.state.formData) {
      setSavedSubOrgs((prev) => [location.state.formData, ...prev]);
    }
  }, [location.state]);

  const handleAddNew = () => {
    navigate("/dashboard/profile/sub-organization");
  };

  const handleEdit = (index) => {
    navigate("/profile/sub-organization", {
      state: { formData: savedSubOrgs[index] },
    });
  };

  const handleDelete = (index) => {
    setSavedSubOrgs((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className={styles.dataContainer}>
      <h2>Sub-Organization Details</h2>
      <div className={styles.subOrgList}>
        {savedSubOrgs.map((subOrg, index) => (
          <SubOrganizationCard
            key={index}
            data={subOrg}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
        <div
          className={styles.addNewCard}
          onClick={handleAddNew}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleAddNew();
            }
          }}
        >
          <span className={styles.addIcon}>+</span>
          <span>Add New</span>
        </div>
      </div>
    </div>
  );
};

export default SubOrganizationData;
