import { clearAuthState } from "./clearAuthState";

export const attemptTokenRefresh = async (baseUrl, login, setToken, setVerifed) => {
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
        // Use the same login function to handle all cookie setting and state updates
        login(data, true);
        return true;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
    clearAuthState(setToken, setVerifed);
    return false;
  };