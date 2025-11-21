import { getToken, setSessionToken } from "@/Context/Auth/Cookies";
import { attemptTokenRefresh } from "@/Context/Auth/TokenRefresh";

/**
 * Authenticated Fetch - Automatically includes auth token in all API requests
 *
 * Token Resolution:
 * - Checks sessionStorage first (active session token)
 * - Falls back to cookies (persistent token from "Remember Me")
 *
 * This ensures requests always have valid credentials regardless of "Remember Me" setting
 */
export const authenticatedFetch = async (
  url,
  options = {},
  baseUrl,
  login,
  setToken
) => {
  // Get token from sessionStorage or cookies (with priority to sessionStorage)
  const token = getToken("accessToken");

  // Ensure we include credentials (cookies) on all requests by default.
  // Honor caller-provided `credentials` if explicitly set in options.
  const fetchOptions = {
    ...options,
    credentials: options.credentials ?? "include",
  };

  const headers = {
    ...fetchOptions.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  let response = await fetch(url, { ...fetchOptions, headers });

  // If 401 and we have a token, try to refresh
  if (response.status === 401 && token) {
    const refreshSuccess = await attemptTokenRefresh(baseUrl, login, setToken);
    if (refreshSuccess) {
      // Get the new token from hybrid storage
      const newToken = getToken("accessToken");
      const retryHeaders = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${newToken}`,
      };
      response = await fetch(url, { ...fetchOptions, headers: retryHeaders });
    }
  }

  return response;
};
