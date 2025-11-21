import { deleteCookie, deleteSessionToken } from "@/Context/Auth/Cookies";

/**
 * Clear Auth State - Complete cleanup on logout
 *
 * Removes all authentication data from:
 * - sessionStorage (active session)
 * - cookies (persistent storage)
 * - React state
 */
export const clearAuthState = (setToken, setVerifed) => {
  // Clear sessionStorage
  deleteSessionToken("accessToken");

  // Clear all cookies
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  deleteCookie("rememberMe");

  // Clear localStorage flags
  localStorage.removeItem("rememberMe");

  // Clear React state
  setToken(null);
  setVerifed(false);
};
