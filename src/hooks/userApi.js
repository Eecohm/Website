import { authenticatedFetch } from "@/Context/Auth/authenticatedFetch";

export const updateUserStatus = async (
  userId,
  category,
  active,
  baseUrl,
  login,
  setToken
) => {
  try {
    // Use plural category for api endpoint
    const categoryPlural = `${category}s`;

    const endpoint = `${baseUrl}/user/${categoryPlural}/${userId}/`;
    console.log("Updating user status:", {
      userId,
      category,
      active,
    });

    const response = await authenticatedFetch(
      endpoint,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: active }),
      },
      baseUrl,
      login,
      setToken
    );

    if (response.ok) {
      return { success: true };
    }

    const errorData = await response.json().catch(() => ({}));
    return {
      success: false,
      error: errorData.message || `HTTP ${response.status}`,
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
