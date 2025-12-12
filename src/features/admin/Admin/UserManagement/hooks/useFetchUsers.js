import { useEffect, useState } from "react";
import { authenticatedFetch } from "@/Context/Auth/authenticatedFetch";

/**
 * Custom hook to fetch users from the backend
 * @param {string} baseUrl - The base URL for API requests
 * @returns {Object} - { users, loading, error }
 */
export const useFetchUsers = (baseUrl) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!baseUrl) {
      setLoading(false);
      setError("Base URL not provided");
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        // fetch the list of endpoints
        const indexUrl = `${baseUrl}/user/`;
        const indexResponse = await authenticatedFetch(
          indexUrl,
          { method: "GET" },
          baseUrl
        );

        if (!indexResponse.ok) {
          throw new Error(
            `Failed to fetch user endpoints: ${indexResponse.statusText}`
          );
        }

        const endpoints = await indexResponse.json();

        // Fetch from each endpoint and combine data
        const usersByCategory = {};
        const allUsers = [];
        let userId = 1;

        for (const [category, url] of Object.entries(endpoints)) {
          try {
            const categoryResponse = await authenticatedFetch(
              url,
              { method: "GET" },
              baseUrl
            );

            if (categoryResponse.ok) {
              const categoryData = await categoryResponse.json();

              // Handle if data is an array or has a data property
              const categoryUsers = Array.isArray(categoryData)
                ? categoryData
                : categoryData.data || categoryData.results || [];

              // Map each user and add category info
              const mappedUsers = categoryUsers.map((user) => ({
                id: userId++,
                dbId: user.id || user.pk || userId - 1,
                firstName: user.firstName || "",
                middleName: user.middleName || "",
                lastName: user.lastName || "",
                email: user.userEmail || user.email || "",
                phone:
                  user.phone || user.tellPhone || user.alternatePhone || "",
                // status: "approved",
                status: user.status || user.kycStatus || "pending",
                photo: user.photo || "",
                category: category.replace(/s$/, ""), // singular form
                gender: user.gender || "",
                country: user.country || "",
                province: user.province || "",
                municipality: user.municipality || "",
                ward: user.ward || "",
                tole: user.tole || "",
                pinPoint: user.pinPoint || "",
                alternatePhone: user.alternatePhone || "",
                contactPerson: user.contactPerson || "",
                nagariktaNo: user.nagariktaNo || "",
                panNo: user.panNo || "",
                nagariktaPhoto: user.nagariktaPhoto || "",
                panPhoto: user.panPhoto || "",
                academicQualification: user.academicQualification || "",
                jobApplication: user.jobApplication || "",
                hiringLetter: user.hiringLetter || "",
                resumeCv: user.resumeCv || "",
                category: category.replace(/s$/, ""), // singular form
                kycStatus: user.kycStatus || user.status || "pending",
                // verified: user.verified || user.status === "approved",
                verified:
                  user.verified ||
                  user.status === "approved" ||
                  user.kycStatus === "approved",
                isActive: user.isActive ?? true,
                submittedAt:
                  user.createdAt ||
                  user.submittedAt ||
                  new Date().toISOString(),
              }));
              console.log("raw user data:", categoryData);

              allUsers.push(...mappedUsers);
            }
          } catch (err) {
            console.warn(`Error fetching ${category}:`, err);
            // Continue fetching other categories even if one fails
          }
        }

        console.log("Combined user list:", allUsers);
        setUsers(allUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [baseUrl]);

  return { users, loading, error };
};
