import { getCookie } from "./Cookies";
import { attemptTokenRefresh } from "./TokenRefresh";
import { clearAuthState } from "./clearAuthState";

export const verifyToken = async (baseUrl, login) => {
  let savedToken = getCookie("accessToken");
  const rememberMeFlag = getCookie("rememberMe") === "true";

  if (!savedToken && rememberMeFlag) {
    savedToken = getCookie("accessToken");
  }

  if (!savedToken) {
    const refreshed = await attemptTokenRefresh(baseUrl, login);
    savedToken = getCookie("accessToken");
    if (!savedToken) return { savedToken: null, isValid: false };
  }

  try {
    const response = await fetch(`${baseUrl}/user/verify-token/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${savedToken}` },
    });

    if (response.ok) {
      return { savedToken, isValid: true };
    }

    if (rememberMeFlag) {
      const refreshed = await attemptTokenRefresh(baseUrl, login);
      const newToken = getCookie("accessToken");
      if (newToken) {
        const retryResponse = await fetch(`${baseUrl}/user/verify-token/`, {
          method: "GET",
          headers: { Authorization: `Bearer ${newToken}` },
        });
        return { savedToken: retryResponse.ok ? newToken : null, isValid: retryResponse.ok };
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