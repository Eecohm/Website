import { setSessionToken } from "./Cookies";
import { clearAuthState } from "./clearAuthState";

/**
 * Attempt Token Refresh
 *
 * Refreshes expired tokens from backend and stores in both:
 * - sessionStorage (always, for active session)
 * - cookies (if "Remember Me" was originally set)
 */
export const attemptTokenRefresh = async (
  baseUrl,
  login,
  setToken,
  setVerifed
) => {
  try {
    const response = await fetch(`${baseUrl}/user/token/refresh/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      // Always store refreshed token in sessionStorage
      setSessionToken("accessToken", data.access);

      // Use the login function to handle cookie storage and state updates
      // This will check if "Remember Me" was originally set and update accordingly
      login(data, localStorage.getItem("rememberMe") === "true");
      return true;
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
  }
  clearAuthState(setToken, setVerifed);
  return false;
};
