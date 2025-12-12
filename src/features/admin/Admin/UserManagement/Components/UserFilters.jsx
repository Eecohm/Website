import React from "react";
import styles from "@/features/admin/Admin/UserManagement/UserManagement.module.css";

const UserFilters = ({ filters, setFilters }) => {
  const handleFilterChange = (filterKey, value) => {
    setFilters({ ...filters, [filterKey]: value });
  };

  return (
    <div className={styles.filtersSection}>
      <select
        value={filters.role}
        onChange={(e) => handleFilterChange("role", e.target.value)}
        className={styles.filterSelect}
      >
        <option value="all">Roles</option>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="owner">Owner</option>
        {/* <option value="admin">Admin</option> */}
        <option value="employee">Employee</option>
      </select>

      <select
        value={filters.verified}
        onChange={(e) => handleFilterChange("verified", e.target.value)}
        className={styles.filterSelect}
      >
        <option value="all">Users Verification</option>
        <option value="approved">Approved</option>
        <option value="unverified">Unverified</option>
      </select>

      <select
        value={filters.kycStatus}
        onChange={(e) => handleFilterChange("kycStatus", e.target.value)}
        className={styles.filterSelect}
      >
        <option value="all">KYC Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      <select
        value={filters.active}
        onChange={(e) => handleFilterChange("active", e.target.value)}
        className={styles.filterSelect}
      >
        <option value="all">Active Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <div className={styles.dateFilterWrapper}>
        <label className={styles.dateLabel}>Created At </label>
        <input
          type="date"
          value={filters.createdAt || ""}
          onChange={(e) => handleFilterChange("createdAt", e.target.value)}
          className={styles.dateInput}
          placeholder="created at"
        />
      </div>
    </div>
  );
};

export default UserFilters;
