import { getCookie } from "./Cookies";
import { attemptTokenRefresh } from "./TokenRefresh";

export const authenticatedFetch = async (url, options = {}, baseUrl, login, setToken) => {
  const token = getCookie("accessToken");
  const headers = {
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401 && token) {
    const refreshSuccess = await attemptTokenRefresh(baseUrl, login, setToken);
    if (refreshSuccess) {
      const newToken = getCookie("accessToken");
      const retryHeaders = {
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
      };
      response = await fetch(url, { ...options, headers: retryHeaders });
    }
  }

  return response;
};