import { authenticatedFetch } from "@/Context/Auth/authenticatedFetch";
import { getCookie } from "@/Context/Auth/Cookies";

export const submitOwnerInfo = async (
  formData,
  baseUrl,
  login,
  setToken,
  method = "POST" // default to POST
) => {
  try {
    const userId = getCookie("id");
    const token = getCookie("accessToken");

    // Initialize FormData
    const submitData = new FormData();

    // Helper function to safely append fields
    const appendIfPresent = (key, value) => {
      if (value !== undefined && value !== null && value !== "")
        submitData.append(key, value);
    };

    // --- Required fields (excluding user for now) ---
    [
      "firstName",
      "lastName",
      "dateOfBirth",
      "gender",
      "country",
      "province",
      "municipality",
      "ward",
      "tole",
      "phone",
      "nagariktaNo",
      "panNo",
    ].forEach((field) => appendIfPresent(field, formData[field]));

    // --- Optional fields ---
    [
      "middleName",
      "tellPhone",
      "alternatePhone",
      "website",
      "contactPerson",
    ].forEach((field) => appendIfPresent(field, formData[field]));

    // --- File fields ---
    ["photo", "nagariktaPhoto", "panPhoto", "pinPoint"].forEach((fileField) =>
      appendIfPresent(fileField, formData[fileField])
    );

    // --- Append user logic based on method ---
    if (["PUT", "PATCH"].includes(method.toUpperCase())) {
      // send the user provided in formData
      appendIfPresent("user", formData.user);
    } else {
      // for POST or others, explicitly send user as null
      submitData.append("user", "");
    }

    // --- Append userId (for backend reference) ---
    appendIfPresent("userId", userId);

    console.log("🟢 Sending Owner Info to backend...");
    for (const [key, value] of submitData.entries()) {
      console.log(`${key}:`, value);
    }

    console.log("Token exists:", !!token, "| User ID:", userId);

    // --- Determine API endpoint based on method ---
    let endpoint = `${baseUrl}/user/owners/`;
    if (["PUT", "PATCH"].includes(method.toUpperCase()) && formData.userId) {
      // For edit mode, use the specific user's endpoint
      endpoint = `${baseUrl}/user/owners/${formData.userId}/`;
      console.log("🔄 Edit mode - using endpoint:", endpoint);
    } else {
      console.log("➕ Create mode - using endpoint:", endpoint);
    }

    // --- API Request ---
    const response = await authenticatedFetch(
      endpoint,
      { method, body: submitData },
      baseUrl,
      login,
      setToken
    );


    // --- Handle response ---
    const data = await response.json().catch(() => ({}));

    if (response.ok) return { success: true, data };

    return {
      success: false,
      error: data.message || `HTTP ${response.status}: ${response.statusText}`,
    };
  } catch (error) {
    console.error("❌ Owner submission error:", error);
    return {
      success: false,
      error: error.message || "Network error occurred",
    };
  }
};
