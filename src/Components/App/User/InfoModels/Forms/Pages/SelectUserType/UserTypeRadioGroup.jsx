import React from "react";
import styles from "./SelectUserType.module.css";

const UserTypeRadioGroup = ({
  selectedUserType,
  searchFilter,
  searchQuery,
  searchResults,
  selectedPerson,
  isSearching,
  showResults,
  handleUserTypeChange,
  setSearchFilter,
  handleSearchChange,
  handlePersonSelect,
  handleClearSelection,
  selectedSubUserType,
  handleUserTypeSelection,
}) => {
  return (
    <div className={styles.radioGroup}>
      <h3>Who is submitting this form?</h3>

      {/* Option 1: Self */}
      <label className={styles.radioOption}>
        <input
          type="radio"
          name="userType"
          value="self"
          checked={selectedUserType === "self"}
          onChange={(e) => handleUserTypeChange(e.target.value)}
        />
        <div className={styles.optionContent}>
          <span className={styles.optionTitle}>Self</span>
          <span className={styles.optionDescription}>
            I am submitting for myself
          </span>
        </div>
      </label>

      {/* Option 2: Not Me */}
      <label className={styles.radioOption}>
        <input
          type="radio"
          name="userType"
          value="not-me"
          checked={selectedUserType === "not-me"}
          onChange={(e) => handleUserTypeChange(e.target.value)}
        />
        <div className={styles.optionContent}>
          <span className={styles.optionTitle}>Doesn't have an account</span>
          <span className={styles.optionDescription}>
            I am submitting for someone who doesn't have an account
          </span>
        </div>
      </label>

      {/* Option 3: Select Who */}
      <label className={styles.radioOption}>
        <input
          type="radio"
          name="userType"
          value="select-who"
          checked={selectedUserType === "select-who"}
          onChange={(e) => handleUserTypeChange(e.target.value)}
        />
        <div className={styles.optionContent}>
          <span className={styles.optionTitle}>Select Who</span>
          <span className={styles.optionDescription}>
            I am submitting for someone specific
          </span>
        </div>
      </label>

      {/* New Type Selection and Search - Only show if "select-who" is selected */}
      {selectedUserType === "select-who" && (
        <div className={styles.typeSearchSection}>
          <div className={styles.typeSearchControls}>
            {/* User Type Dropdown with Hover */}
            <div className={styles.typeDropdownContainer}>
              <select
                className={styles.typeDropdown}
                value={selectedSubUserType}
                onChange={(e) => handleUserTypeSelection(e.target.value)}
              >
                <option value="">Select User Type</option>
                <option value="student">Student</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="employee">Employee</option>
                <option value="guardian">Guardian</option>
              </select>
            </div>

            {/* Search Bar beside dropdown */}
            <input
              type="text"
              className={styles.typeSearchInput}
              placeholder="Search by name, phone, or ID..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTypeRadioGroup;
