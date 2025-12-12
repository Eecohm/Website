import React, { useContext, useState } from "react";
import styles from "@/features/admin/Admin/UserManagement/UserManagement.module.css";
import { useUserFilters } from "@/features/admin/Admin/UserManagement/hooks/useUserFilter";
import { useFetchUsers } from "@/features/admin/Admin/UserManagement/hooks/useFetchUsers";
import { BaseUrlContext } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import SearchSection from "@/features/admin/Admin/UserManagement/Components/SearchSection";
import UserFilters from "@/features/admin/Admin/UserManagement/Components/UserFilters";
import UserGrid from "@/features/admin/Admin/UserManagement/Components/UserGrid";

const UserManagement = ({ onBack }) => {
  const baseUrl = useContext(BaseUrlContext);
  const { login, setToken } = useAuth();

  // Get initial users from hook
  const { users: initialUsers, loading, error } = useFetchUsers(baseUrl);

  // Create local state for users that can be updated
  const [users, setUsers] = useState([]);

  // Update local state when initial users load
  React.useEffect(() => {
    if (initialUsers) {
      setUsers(initialUsers);
    }
  }, [initialUsers]);

  const { searchQuery, setSearchQuery, filters, setFilters, filteredUsers } =
    useUserFilters(users);

  const handleUserUpdate = (userId, updates) => {
    // Update the local users array
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, ...updates } : user
      )
    );
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <SearchSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onBack={onBack}
      />
      <UserFilters filters={filters} setFilters={setFilters} />
      <UserGrid
        filteredUsers={filteredUsers}
        onUserUpdate={handleUserUpdate}
        baseUrl={baseUrl}
        login={login}
        setToken={setToken}
      />
    </div>
  );
};

export default UserManagement;
