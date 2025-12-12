// src/h.6oks/useUserFilters.js
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

    const result = users.filter((user) => {
      // Search filter
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const matchesSearch =
        fullName.includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.category?.toLowerCase().includes(searchQuery.toLowerCase());

      // Role filter
      const matchesRole =
        filters.role === "all" ||
        user.category === filters.role ||
        user.category === `${filters.role}s`;

      // Verification/Status filter - use verified field
      const matchesVerified =
        filters.verified === "all" ||
        (filters.verified === "verified" && user.verified) ||
        (filters.verified === "unverified" && !user.verified);

      // KYC filter - use kycStatus field
      const matchesKyc =
        filters.kycStatus === "all" || user.kycStatus === filters.kycStatus;

      // Active filter - use isActive field
      // const matchesActive =
      //   filters.active === "all" ||
      //   (filters.active === "active" && user.isActive) ||
      //   (filters.active === "inactive" && !user.isActive);
      const matchesActive =
        filters.active === "all" ||
        (filters.active === "active" && user.isActive !== false) ||
        (filters.active === "inactive" && user.isActive === false);

      // Date filter - proper date comparison
      const matchesDate =
        !filters.createdAt ||
        new Date(user.submittedAt).toDateString() ===
          new Date(filters.createdAt).toDateString();

      return (
        matchesSearch &&
        matchesRole &&
        matchesVerified &&
        matchesKyc &&
        matchesActive &&
        matchesDate
      );
    });

    // Debug logging
    console.log("Filter Debug:", {
      totalUsers: users.length,
      filteredCount: result.length,
      activeFilters: Object.fromEntries(
        Object.entries(filters).filter(
          ([key, value]) => value !== "all" && value !== ""
        )
      ),
      searchQuery: searchQuery || "none",
    });

    return result;
  }, [users, searchQuery, filters]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredUsers,
  };
};
