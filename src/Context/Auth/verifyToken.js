import { getToken, setSessionToken } from "@/Context/Auth/Cookies";
import { attemptTokenRefresh } from "@/Context/Auth/TokenRefresh";
import { clearAuthState } from "@/Context/Auth/clearAuthState";

/**
 * Verify Token on App Startup
 *
 * Restoration Strategy:
 * 1. Check sessionStorage first (active session token)
 * 2. Check cookies (persistent token from "Remember Me")
 * 3. If token exists, validate with backend
 * 4. If no valid token found, attempt refresh
 * 5. Restore to sessionStorage for active session use
 */
export const verifyToken = async (baseUrl, login) => {
  // Get token from hybrid storage (sessionStorage priority, then cookies)
  let savedToken = getToken("accessToken");
  const rememberMeFlag = localStorage.getItem("rememberMe") === "true";

  // If we have a persistent token from cookies but not in sessionStorage, restore it
  if (!savedToken && rememberMeFlag) {
    savedToken = getToken("accessToken");
    if (savedToken) {
      // Restore to sessionStorage for active session
      setSessionToken("accessToken", savedToken);
    }
  }

  if (!savedToken) {
    const refreshed = await attemptTokenRefresh(baseUrl, login);
    savedToken = getToken("accessToken");
    if (!savedToken) return { savedToken: null, isValid: false };
  }

  try {
    const response = await fetch(`${baseUrl}/user/verify-token/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${savedToken}` },
    });

    if (response.ok) {
      // Ensure token is in sessionStorage for active session
      if (!sessionStorage.getItem("accessToken")) {
        setSessionToken("accessToken", savedToken);
      }
      return { savedToken, isValid: true };
    }

    if (rememberMeFlag) {
      const refreshed = await attemptTokenRefresh(baseUrl, login);
      const newToken = getToken("accessToken");
      if (newToken) {
        const retryResponse = await fetch(`${baseUrl}/user/verify-token/`, {
          method: "GET",
          headers: { Authorization: `Bearer ${newToken}` },
        });
        if (retryResponse.ok) {
          // Ensure new token is in sessionStorage
          setSessionToken("accessToken", newToken);
        }
        return {
          savedToken: retryResponse.ok ? newToken : null,
          isValid: retryResponse.ok,
        };
      }
    }
    clearAuthState();
    return { savedToken: null, isValid: false };
  } catch (error) {
    console.error("Token verification failed:", error);
    clearAuthState();
    return { savedToken: null, isValid: false };
  }
};
