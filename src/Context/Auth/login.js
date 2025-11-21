import {
  setCookie,
  deleteCookie,
  setSessionToken,
} from "@/Context/Auth/Cookies";

/**
 * Login handler - Manages token storage based on "Remember Me" setting
 *
 * Storage Strategy:
 * - ALWAYS stores token in sessionStorage for active session
 * - If rememberMe is true: also stores in cookies for persistence across browser restarts
 * - If rememberMe is false: only sessionStorage (cleared on browser close)
 * This ensures API requests always have valid credentials during active session
 */
export const login = (data, rememberMe, setToken, setVerified) => {
  // Always store token in sessionStorage (active session)
  setSessionToken("accessToken", data.access);

  // Update React state
  setToken(data.access);
  setVerified(true);

  // If "Remember Me" is checked, also persist to cookies and localStorage
  if (rememberMe) {
    setCookie("accessToken", data.access, 30);
    setCookie("rememberMe", "true", 30);
    localStorage.setItem("rememberMe", "true");
  } else {
    // Clear persistent storage if "Remember Me" is unchecked
    deleteCookie("accessToken");
    deleteCookie("rememberMe");
    localStorage.removeItem("rememberMe");
  }
};
