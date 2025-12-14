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
        const uniqueUsersMap = new Map();
        let userId = 1;

        for (const [category, url] of Object.entries(endpoints)) {
          // Skip the generic 'users' or 'all' endpoint if it just duplicates the specific ones, 
          // OR skip specific ones if 'users' has everything. 
          // Assuming backend structure: /user/ returns keys like 'teachers': '.../teachers/', 'students': '...'. 
          // If there is an 'all' or 'users' key that aggregates, that might be the cause. 
          // Without knowing exact backend response, deduplication is safest.

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
              // Map each user and add category info
              categoryUsers.forEach((user) => {
                const dbId = user.id || user.pk;
                const normalizedCategory = category.replace(/s$/, ""); // singular form

                const mappedUser = {
                  id: userId++, // This might need handling if we overwrite, but usually unique ID for grid is fine.
                  dbId: dbId || userId - 1,
                  firstName: user.firstName || "",
                  middleName: user.middleName || "",
                  lastName: user.lastName || "",
                  email: user.userEmail || user.email || "",
                  phone: user.phone || user.tellPhone || user.alternatePhone || "",
                  status: user.status || user.kycStatus || "pending",
                  photo: user.photo || "",
                  category: normalizedCategory,
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
                  kycStatus: user.kycStatus || user.status || "pending",
                  verified: user.verified || user.status === "approved" || user.kycStatus === "approved",
                  isActive: user.isActive ?? true,
                  submittedAt: user.createdAt || user.submittedAt || new Date().toISOString(),
                };

                if (!uniqueUsersMap.has(dbId)) {
                  uniqueUsersMap.set(dbId, mappedUser);
                } else {
                  // User exists. Check if we should upgrade the category.
                  const existingUser = uniqueUsersMap.get(dbId);
                  const genericCategories = ['user', 'users'];

                  const isExistingGeneric = genericCategories.includes(existingUser.category.toLowerCase());
                  const isNewGeneric = genericCategories.includes(normalizedCategory.toLowerCase());

                  // If existing is generic and new is specific, overwrite.
                  if (isExistingGeneric && !isNewGeneric) {
                    // We keep the old 'id' (grid key) to maintain order/integrity if desired, 
                    // or just overwrite entirely. Let's overwrite but maybe keep id? 
                    // Actually, a new ID is fine, or keeping old ID is fine. 
                    // Let's replace the data but keep the key.
                    // Note: mappedUser has a new 'id' generated. 

                    uniqueUsersMap.set(dbId, mappedUser);
                    console.log(`Upgrading user ${dbId} from ${existingUser.category} to ${normalizedCategory}`);
                  }
                }
              });

              // Log for debug
              console.log(`Fetched ${categoryUsers.length} from ${category}`);
            }
          } catch (err) {
            console.warn(`Error fetching ${category}:`, err);
          }
        }

        const allUsers = Array.from(uniqueUsersMap.values());
        console.log("Combined unique user list:", allUsers);
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
