import React from "react";
import styles from "../UserManagement.module.css";

const SearchSection = ({ searchQuery, setSearchQuery, onBack }) => {
  return (
    <div className={styles.topSection}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backButton}>
          ← Back to Dashboard
        </button>
      </div>
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>
    </div>
  );
};

export default SearchSection;
