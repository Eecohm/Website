import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { BaseUrlContext } from "@/Context/BaseUrlContext";
import { useFetchUserDetail } from "@/features/admin/Admin/UserManagement/hooks/useFetchUserDetail";
import styles from "@/features/admin/Admin/UserManagement/UserManagement.module.css";
import { getInitials } from "@/features/admin/Admin/UserManagement/utils/userUtils";

const UserDetail = ({ onBack }) => {
  const baseUrl = useContext(BaseUrlContext);
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  const { userDetail, loading, error } = useFetchUserDetail(
    baseUrl,
    category,
    userId
  );

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.detailContainer}>
          <button className={styles.backButton} onClick={handleBack}>
            ← Back
          </button>
          <p>Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.detailContainer}>
          <button className={styles.backButton} onClick={handleBack}>
            ← Back
          </button>
          <p style={{ color: "red" }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!userDetail) {
    return (
      <div className={styles.container}>
        <div className={styles.detailContainer}>
          <button className={styles.backButton} onClick={handleBack}>
            ← Back
          </button>
          <p>No user data available</p>
        </div>
      </div>
    );
  }

  const firstName = userDetail.first_name || userDetail.firstName || "";
  const lastName = userDetail.last_name || userDetail.lastName || "";
  const userName = `${firstName} ${lastName}`.trim();
  const profileImage =
    userDetail.profile_image || userDetail.profileImage || "";
  const email = userDetail.email || "";
  const phone = userDetail.phone || userDetail.phone_number || "";
  const status = userDetail.status || "approved";

  const statusColor =
    status === "approved"
      ? "#4caf50"
      : status === "pending"
      ? "#ff9800"
      : "#f44336";

  return (
    <div className={styles.container}>
      <div className={styles.detailContainer}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Back
        </button>

        <div className={styles.detailCard}>
          {/* Profile Image */}
          <div className={styles.detailImageSection}>
            {profileImage ? (
              <img
                src={profileImage}
                alt={userName}
                className={styles.detailProfileImage}
              />
            ) : (
              <div className={styles.detailProfilePlaceholder}>
                {getInitials(userName)}
              </div>
            )}
          </div>

          {/* User Information */}
          <div className={styles.detailInfoSection}>
            <h2 className={styles.detailUserName}>{userName}</h2>

            <div className={styles.detailField}>
              <label>Category:</label>
              <p>{category.charAt(0).toUpperCase() + category.slice(1)}</p>
            </div>

            <div className={styles.detailField}>
              <label>Status:</label>
              <p style={{ color: statusColor, fontWeight: "bold" }}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </p>
            </div>

            <div className={styles.detailField}>
              <label>Email:</label>
              <p>{email || "N/A"}</p>
            </div>

            <div className={styles.detailField}>
              <label>Phone:</label>
              <p>{phone || "N/A"}</p>
            </div>

            {/* Additional fields from backend */}
            {Object.entries(userDetail).map(([key, value]) => {
              // Skip fields we've already displayed
              if (
                [
                  "id",
                  "first_name",
                  "last_name",
                  "email",
                  "phone",
                  "phone_number",
                  "status",
                  "profile_image",
                  "profileImage",
                  "firstName",
                  "lastName",
                ].includes(key)
              ) {
                return null;
              }
              // Skip internal/metadata fields
              if (
                key.startsWith("_") ||
                key === "password" ||
                typeof value === "object"
              ) {
                return null;
              }
              return (
                <div key={key} className={styles.detailField}>
                  <label>
                    {key
                      .replace(/_/g, " ")
                      .replace(/^\w/, (c) => c.toUpperCase())}
                    :
                  </label>
                  <p>{String(value)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
