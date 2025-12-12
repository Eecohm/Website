import { useEffect, useState } from "react";
import { authenticatedFetch } from "@/Context/Auth/authenticatedFetch";

/**
 * Custom hook to fetch detailed user information from the backend
 * @param {string} baseUrl - The base URL for API requests
 * @param {string} category - The user category (students, guardians, teachers, owners, employees)
 * @param {number} userId - The user ID to fetch
 * @returns {Object} - { userDetail, loading, error }
 */
export const useFetchUserDetail = (baseUrl, category, userId) => {
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!baseUrl || !category || !userId) {
      setLoading(false);
      setError("Missing required parameters");
      return;
    }

    const fetchUserDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // Construct the API URL based on category
        const categoryEndpoints = {
          students: "students",
          guardians: "guardians",
          teachers: "teachers",
          owners: "owners",
          employees: "employees",
        };
        const endpoint = categoryEndpoints[category];
        if (!endpoint) {
          throw new Error(`Invalid category: ${category}`);
        }

        const detailUrl = `${baseUrl}/user/${endpoint}/${userId}/`;
        console.log("Fetching user detail from:", detailUrl);

        const response = await authenticatedFetch(
          detailUrl,
          { method: "GET" },
          baseUrl
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch user details: ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("User detail data:", data);
        setUserDetail(data);
      } catch (err) {
        console.error("Error fetching user detail:", err);
        setError(err.message);
        setUserDetail(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [baseUrl, category, userId]);

  return { userDetail, loading, error };
};
