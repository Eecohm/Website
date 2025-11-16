/**
 * Session Storage Methods - Stores token for active session (memory)
 */
export const setSessionToken = (name, value) => {
  sessionStorage.setItem(name, value);
};

export const getSessionToken = (name) => {
  return sessionStorage.getItem(name);
};

export const deleteSessionToken = (name) => {
  sessionStorage.removeItem(name);
};

/**
 * Persistent Cookie Methods - Stores token across browser restarts
 * Only used when "Remember Me" is enabled
 */
export const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
};

export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;secure;samesite=strict`;
};

/**
 * Hybrid Token Retrieval - Check both sessionStorage and cookies
 * Priority: sessionStorage (active session) → localStorage (persistent)
 */
export const getToken = (name) => {
  // First check sessionStorage (active session)
  const sessionToken = getSessionToken(name);
  if (sessionToken) return sessionToken;

  // Fallback to cookies (persistent storage from "Remember Me")
  return getCookie(name);
};
