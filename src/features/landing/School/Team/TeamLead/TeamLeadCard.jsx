import React from "react";
import styles from "@/features/landing/School/Team/TeamLead/TeamLeadCard.module.css";

function TeamLeadCard({ name, role, bio, image, isSelected, onSelect }) {
  return (
    <div
      className={`${styles.teamLeadCard} ${isSelected ? styles.selected : ""}`}
      onClick={onSelect}
    >
      <div className={styles.teamLeadImage}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.teamLeadInfo}>
        <h3>{name}</h3>
        {isSelected && (
          <div className={styles.teamLeadDetails}>
            {role && <p className={styles.role}>{role}</p>}
            <p className={styles.bio}>{bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamLeadCard;
