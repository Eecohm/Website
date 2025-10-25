// src/hooks/useUserFilters.js
import { useState, useMemo } from "react";

export const useUserFilters = (users) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    role: "all",
    verified: "all",
    kycStatus: "all",
    active: "all",
    createdAt: "",
  });

  const filteredUsers = useMemo(() => {
    if (!users || users.length === 0) return [];

    return users.filter((user) => {
      // Search filter
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase());

      // Role filter
      const matchesRole = filters.role === "all" || user.role === filters.role;

      // Verification filter
      const matchesVerified =
        filters.verified === "all" || user.verified === filters.verified;

      // KYC filter
      const matchesKyc =
        filters.kycStatus === "all" || user.kycStatus === filters.kycStatus;

      // Active filter
      const matchesActive =
        filters.active === "all" || user.active === filters.active;

      // Date filter
      const matchesDate =
        !filters.createdAt || user.createdAt === filters.createdAt;

      return (
        matchesSearch &&
        matchesRole &&
        matchesVerified &&
        matchesKyc &&
        matchesActive &&
        matchesDate
      );
    });
  }, [users, searchQuery, filters]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredUsers,
  };
};
