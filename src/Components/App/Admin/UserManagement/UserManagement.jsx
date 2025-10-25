import React from "react";
import styles from "./UserManagement.module.css";
import { useUserFilters } from "./hooks/useUserFilter";
import { allUsers } from "./data/userData";
import { getInitials, capitalizeFirst } from "./utils/userUtils";

const UserManagement = ({ onBack }) => {
  const { searchQuery, setSearchQuery, filters, setFilters, filteredUsers } =
    useUserFilters(allUsers);

  return (
    <div className={styles.container}>
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

      <div className={styles.filtersSection}>
        <select
          value={filters.role}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          className={styles.filterSelect}
        >
          <option value="all">Roles</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>

        <select
          value={filters.verified}
          onChange={(e) => setFilters({ ...filters, verified: e.target.value })}
          className={styles.filterSelect}
        >
          <option value="all">Users Verification</option>
          <option value="verified">Verified</option>
          <option value="unverified">Unverified</option>
        </select>

        <select
          value={filters.kycStatus}
          onChange={(e) =>
            setFilters({ ...filters, kycStatus: e.target.value })
          }
          className={styles.filterSelect}
        >
          <option value="all">KYC Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          value={filters.active}
          onChange={(e) => setFilters({ ...filters, active: e.target.value })}
          className={styles.filterSelect}
        >
          <option value="all">Active Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Date Range Filter */}
        <div className={styles.dateFilterWrapper}>
          <label className={styles.dateLabel}>Created At </label>
          <input
            type="date"
            value={filters.createdAt || ""}
            onChange={(e) =>
              setFilters({ ...filters, createdAt: e.target.value })
            }
            className={styles.dateInput}
            placeholder="created at"
          />
        </div>
      </div>

      {/* User Grid with Filtered Users */}
      <div className={styles.userGrid}>
        {filteredUsers.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No users found matching your criteria.</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className={styles.userCard}>
              {/* Top Section: Image and Name */}
              <div className={styles.userCardHeader}>
                {user.image ? (
                  <img
                    src={user.image}
                    alt="User Avatar"
                    className={styles.userImage}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={styles.userImagePlaceholder}
                  style={{ display: user.image ? "none" : "flex" }}
                >
                  {getInitials(user.name)}
                </div>
                <h3 className={styles.userName}>{user.name}</h3>
              </div>

              {/* Bottom Section: Details in 2 columns */}
              <div className={styles.userDetailsGrid}>
                <div className={styles.userDetail}>
                  <span className={styles.userLabel}>Role:</span>
                  <span className={styles.userValue}>
                    {capitalizeFirst(user.role)}
                  </span>
                </div>

                <div className={styles.userDetail}>
                  <span className={styles.userLabel}>Status:</span>
                  <span
                    className={`${styles.statusBadge} ${styles[user.verified]}`}
                  >
                    {capitalizeFirst(user.verified)}
                  </span>
                </div>

                <div className={styles.userDetail}>
                  <span className={styles.userLabel}>KYC:</span>
                  <span
                    className={`${styles.statusBadge} ${
                      styles[user.kycStatus]
                    }`}
                  >
                    {capitalizeFirst(user.kycStatus)}
                  </span>
                </div>

                <div className={styles.userDetail}>
                  <span className={styles.userLabel}>Active:</span>
                  <span
                    className={`${styles.statusBadge} ${styles[user.active]}`}
                  >
                    {capitalizeFirst(user.active)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserManagement;
