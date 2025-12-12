import { useState, useEffect } from "react";

export const useKycUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKycUsers = async () => {
      try {
        setLoading(true);

        // Fetch KYC form submissions from backend API
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/kyc/submissions`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                localStorage.getItem("authToken") ||
                sessionStorage.getItem("authToken")
              }`,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch KYC data: ${response.statusText}`);
        }

        const kycSubmissions = await response.json();

        // Filter to get only users who have submitted KYC form
        const kycUsers = kycSubmissions.filter(
          (submission) => submission.userId && submission.submittedAt
        );

        setUsers(kycUsers);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching KYC users:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchKycUsers();
  }, []);

  return { users, loading, error };
};
