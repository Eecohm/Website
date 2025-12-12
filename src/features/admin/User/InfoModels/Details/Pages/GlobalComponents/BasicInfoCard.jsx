import React from "react";
import {
  User,
  Mail,
  Calendar,
  LayoutGrid,
  CreditCard,
  Globe,
} from "lucide-react";
import styles from "@/features/admin/User/InfoModels/Details/Pages/GlobalComponents/BasicInfoCard.module.css";

export const BasicInfoCard = ({
  user,
  role,
  getKycStatusClass,
  additionalFields = [],
  view = "detailed",
  ToggleActive,
}) => {
  if (!user) return null;

  if (view === "summary") {
    return (
      <div className={styles.cardHeader}>
        <div className={styles.photoSection}>
          <div className={styles.photoFrame}>
            {user.photo ? (
              <img src={user.photo} alt={role} className={styles.photo} />
            ) : (
              <User size={80} className={styles.photoPlaceholder} />
            )}
          </div>
        </div>

        <div className={styles.basicInfo}>
          <h2 className={styles.name}>
            {user.firstName} {user.middleName} {user.lastName}
          </h2>
          <div className={styles.infoRow}>
            <CreditCard size={20} className={styles.icon} />
            <span className={styles.label}>KYC Status:</span>
            <span
              className={`${styles.statusBadge} ${getKycStatusClass(
                user.kycStatus
              )}`}
            >
              {user.kycStatus || "Unverified"}
            </span>
          </div>
          {ToggleActive && <ToggleActive userId={user.id} />}{" "}
        </div>
      </div>
    );
  }

  //detailed view
  return (
    <div className={styles.cardHeader}>
      <div className={styles.photoSection}>
        <div className={styles.photoFrame}>
          {user.photo ? (
            <img src={user.photo} alt={role} className={styles.photo} />
          ) : (
            <User size={80} className={styles.photoPlaceholder} />
          )}
        </div>
      </div>

      <div className={styles.basicInfo}>
        <h2 className={styles.name}>
          {user.firstName} {user.middleName} {user.lastName}
        </h2>

        <div className={styles.infoRow}>
          <User size={20} className={styles.icon} />
          <span className={styles.label}>Role:</span>
          <span className={styles.value}>{role}</span>
        </div>

        <div className={styles.infoRow}>
          <Mail size={20} className={styles.icon} />
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>{user.email || "N/A"}</span>
        </div>

        {user.website && (
          <div className={styles.infoRow}>
            <Globe size={20} className={styles.icon} />
            <span className={styles.label}>Website:</span>
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.detailLink}
            >
              {user.website}
            </a>
          </div>
        )}

        {/* date of birth */}
        {/* <div className={styles.infoRow}>
          <Calendar size={20} className={styles.icon} />
          <span className={styles.label}>Date of Birth:</span>
          <span className={styles.value}>
            {user.dateOfBirth
              ? new Date(user.dateOfBirth).toLocaleDateString()
              : "N/A"}
          </span>
        </div> */}

        <div className={styles.infoRow}>
          <LayoutGrid size={20} className={styles.icon} />
          <span className={styles.label}>Gender:</span>
          <span className={styles.value}>{user.gender}</span>
        </div>

        {additionalFields.map((field, idx) => (
          <div key={idx} className={styles.infoRow}>
            {field.icon}
            <span className={styles.label}>{field.label}:</span>
            <span className={styles.value}>{field.value}</span>
          </div>
        ))}

        <div className={styles.infoRow}>
          <CreditCard size={20} className={styles.icon} />
          <span className={styles.label}>KYC Status:</span>
          <span
            className={`${styles.statusBadge} ${getKycStatusClass(
              user.kycStatus
            )}`}
          >
            {user.kycStatus || "Unverified"}
          </span>
        </div>
      </div>
    </div>
  );
};
