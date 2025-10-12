import { authenticatedFetch } from "@/Context/Auth/authenticatedFetch";
import { getCookie } from "@/Context/Auth/Cookies";

export const submitOwnerInfo = async (formData, baseUrl, login, setToken) => {
  // Get user ID from cookie
  const userId = getCookie("id");

  // Create FormData for file uploads
  const submitData = new FormData();

  // Add all form fields
  Object.keys(formData).forEach((key) => {
    if (formData[key] !== null && formData[key] !== "") {
      submitData.append(key, formData[key]);
    }
  });

  // Add user ID
  submitData.append("userId", userId);

  // Make authenticated API call
  return await authenticatedFetch(
    `${baseUrl}/owner-info/submit/`, // Adjust endpoint as needed
    {
      method: "POST",
      body: submitData,
      // Don't set Content-Type header for FormData
    },
    baseUrl,
    login,
    setToken
  );
};
