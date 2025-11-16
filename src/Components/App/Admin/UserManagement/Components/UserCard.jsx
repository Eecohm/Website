import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../UserManagement.module.css";
import { getInitials } from "../utils/userUtils";
import { updateUserStatus } from "@/hooks/userApi";

const UserCard = ({ user, onUserUpdate, baseUrl, login, setToken }) => {
  const [active, setActive] = useState(user.isActive ?? true);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const handleImageError = (e) => {
    e.target.style.display = "none";
    e.target.nextSibling.style.display = "flex";
  };

  const userName = user.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim()
    : user.userName || "N/A";

  // const statusRaw = user.status || "approved";
  const statusRaw = user.kycStatus || user.status || "pending";
  let statusText, statusColor;
  switch (statusRaw) {
    case "approved":
      statusText = "Verified";
      statusColor = "#4caf50";
      break;
    case "pending":
      statusText = "Pending";
      statusColor = "#ff9800";
      break;
    case "rejected":
      statusText = "Unverified";
      statusColor = "#f44336";
      break;
    default:
      statusText = statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1);
      statusColor = "#bdbdbd";
  }

  // Add API call in handleToggle:
  const handleToggle = async () => {
    if (isUpdating) return;
    const newActiveState = !active;
    setIsUpdating(true);
    // Call api to update backend
    try {
      const result = await updateUserStatus(
        // user.id,
        user.dbId,
        user.category,
        newActiveState,
        baseUrl,
        login,
        setToken
      );

      if (result.success) {
        setActive(newActiveState);
        onUserUpdate(user.id, { isActive: newActiveState });
      } else {
        console.error(result.error);
      }
    } catch (err) {
      console.error("Error updating user status:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleViewDetails = () => {
    // Map plural category names to singular for URL routing
    const categoryMap = {
      students: "student",
      guardians: "guardian",
      teachers: "teacher",
      owners: "owner",
      employees: "employee",
    };

    const singularCategory = categoryMap[user.category] || user.category;

    navigate(
      `/dashboard/users/detail/${singularCategory}/detail?id=${user.dbId}`,
      {
        state: { user },
      }
    );
  };
  return (
    <div className={styles.userCardNew}>
      <div className={styles.profileLeft}>
        {user.photo ? (
          <img
            src={user.photo}
            alt="User Avatar"
            className={styles.roundedProfileLarge}
            onError={handleImageError}
          />
        ) : (
          <div className={styles.profilePlaceholderLarge}>
            {getInitials(userName)}
          </div>
        )}
      </div>
      <div className={styles.profileRight}>
        <div className={styles.nameRowWithVerification}>
          <span>
            {user.firstName} {user.lastName}
          </span>
        </div>

        <div
          className={styles.statusRow}
          style={{ color: statusColor, fontWeight: "bold" }}
        >
          {statusRaw === "pending" && (
            <svg
              className={styles.pendingIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          )}
          {statusText}
          {statusRaw === "approved" && (
            <svg
              className={styles.verificationCheckIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </div>
        <div className={styles.iconRow}>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={active}
              onChange={handleToggle}
              disabled={isUpdating}
            />
            <span className={styles.slider}></span>
          </label>
          <span className={styles.activeStatusText}>
            {isUpdating ? "Updating..." : active ? "Active" : "Inactive"}
          </span>
        </div>
        <div className={styles.cardActions}>
          <button className={styles.viewDetailsBtn} onClick={handleViewDetails}>
            View Details ➔
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
