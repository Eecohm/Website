import { setCookie, deleteCookie } from "./Cookies";

export const login = (data, rememberMe, setToken, setVerified) => {
  setToken(data.access);
  setVerified(true);
  if (rememberMe) {
    setCookie("accessToken", data.access, 30);
    setCookie("rememberMe", "true", 30);
  } else {
    deleteCookie("accessToken");
    deleteCookie("rememberMe");
  }
};