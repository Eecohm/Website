/**
 * EXAMPLE: API Integration for KYC Users
 *
 * This file shows how to connect the useKycUsers hook to a real backend API.
 * Replace the kycData.js import with an actual API call.
 */

// ============================================
// OPTION 1: Using Fetch API (Recommended)
// ============================================

import { useState, useEffect } from "react";

export const useKycUsersWithAPI = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKycUsers = async () => {
      try {
        setLoading(true);

        // Replace with your actual API endpoint
        const response = await fetch("/api/kyc/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add authorization header if needed
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming API returns array of users with KYC data
        const kycFilledUsers = data.filter(
          (user) => user.kycStatus && user.kycSubmittedAt
        );
        setUsers(kycFilledUsers);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Failed to fetch KYC users:", err);
      }
    };

    fetchKycUsers();
  }, []);

  return { users, loading, error };
};

// ============================================
// OPTION 2: Using Axios
// ============================================

import axios from "axios";

export const useKycUsersWithAxios = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKycUsers = async () => {
      try {
        setLoading(true);

        // Replace with your actual API endpoint
        const response = await axios.get("/api/kyc/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        const kycFilledUsers = response.data.filter(
          (user) => user.kycStatus && user.kycSubmittedAt
        );
        setUsers(kycFilledUsers);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Failed to fetch KYC users:", err);
      }
    };

    fetchKycUsers();
  }, []);

  return { users, loading, error };
};

// ============================================
// OPTION 3: Filtering by KYC Status
// ============================================

export const useKycUsersByStatus = (status) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKycUsers = async () => {
      try {
        setLoading(true);

        // Filter by KYC status: pending, approved, rejected
        const endpoint = status
          ? `/api/kyc/users?status=${status}`
          : "/api/kyc/users";

        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchKycUsers();
  }, [status]);

  return { users, loading, error };
};

// ============================================
// Expected API Response Format
// ============================================
/*
[
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "student",
    verified: "verified",
    kycStatus: "approved",           // Key field
    active: "active",
    createdAt: "2024-01-15",
    image: "https://...",
    kycSubmittedAt: "2024-01-20"     // Key field
  },
  // ... more users
]
*/

// ============================================
// How to Use in Component
// ============================================
/*
import { useKycUsersWithAPI } from './hooks/useKycUsers';

const UserManagement = ({ onBack }) => {
  const { users, loading, error } = useKycUsersWithAPI();
  // Rest of component remains the same...
};
*/
