import React from "react";
import styles from "../UserManagement.module.css";
import UserCard from "./UserCard";

const UserGrid = ({
  filteredUsers,
  onUserUpdate,
  baseUrl,
  login,
  setToken,
}) => {
  if (filteredUsers.length === 0) {
    return (
      <div className={styles.userGrid}>
        <div className={styles.emptyState}>
          <p>No users found matching your criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.userGrid}>
      {filteredUsers.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onUserUpdate={onUserUpdate}
          baseUrl={baseUrl}
          login={login}
          setToken={setToken}
        />
      ))}
    </div>
  );
};

export default UserGrid;
