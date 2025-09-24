import { deleteCookie } from "./Cookies";

export const clearAuthState = (setToken, setVerifed) => {
    // Clear all cookies
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    setToken(null);
    setVerifed(false);
  };