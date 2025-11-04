import { getCookie } from "./Cookies";
import { attemptTokenRefresh } from "./TokenRefresh";

export const authenticatedFetch = async (
  url,
  options = {},
  baseUrl,
  login,
  setToken
) => {
  const token = getCookie("accessToken");

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

  if (response.status === 401 && token) {
    const refreshSuccess = await attemptTokenRefresh(baseUrl, login, setToken);
    if (refreshSuccess) {
      const newToken = getCookie("accessToken");
      const retryHeaders = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${newToken}`,
      };
      response = await fetch(url, { ...fetchOptions, headers: retryHeaders });
    }
  }

  return response;
};
