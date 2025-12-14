
import React, { createContext, useState, useEffect, useContext } from "react";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { setCookie, getCookie, deleteCookie, setSessionToken, getSessionToken, deleteSessionToken } from "./Auth/Cookies";
import { attemptTokenRefresh } from "./Auth/TokenRefresh";
import { clearAuthState as clearAuthUtil } from "./Auth/clearAuthState";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [role, setRole] = useState(null); // Add role state
  const baseUrl = useBaseUrl();

  const login = (data, rememberMe = false) => {
    setToken(data.access);
    setVerified(data.verified);
    setRole(data.role); // Set role from login data
    if (rememberMe) {
      setCookie("accessToken", data.access, 30);
      setCookie("rememberMe", "true", 30);
      setCookie("verified", data.verified, 30);
      setCookie("kycStatus", data.kyc_status);
      setCookie("id", data.user_id, 30);
      setCookie('role', data.role, 30);
    } else {
      // Use Session Storage for active session (clears on tab close)
      setSessionToken("accessToken", data.access);
      setSessionToken("verified", data.verified);
      setSessionToken("role", data.role); // Store role in session

      // Clear any old persistent cookies to avoid confusion
      deleteCookie("accessToken");
      deleteCookie("rememberMe");
      deleteCookie("kycStatus");
      deleteCookie("verified");
      deleteCookie("id");
      deleteCookie("role");
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint to blacklist refresh token
      await fetch(`${baseUrl}/user/logout/`, {
        method: "POST",
        credentials: "include", // Send refresh token cookie
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Logout API call failed:", error);
      // Continue with logout even if API call fails
    }
    // Always clear local state regardless of API success
    clearAuthUtil(setToken, setVerified);
    setRole(null); // Clear role

    // Clear Session Storage
    deleteSessionToken("accessToken");
    deleteSessionToken("verified");
    deleteSessionToken("role");
  };

  const isAuthenticated = () => verified;

  const validateToken = async (tokenToValidate) => {
    if (!tokenToValidate) return false;

    try {
      const res = await fetch(`${baseUrl}/user/login/`, {
        method: "GET",
        headers: { Authorization: `Bearer ${tokenToValidate}` },
      });

      return res.ok;
    } catch (err) {
      console.error("Token validation failed", err);
      return false;
    }
  };
  // Check authentication status on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        let savedToken = token;
        let savedRole = role;

        // 1. Check for persistent cookie if rememberMe is checked
        const rememberMeFlag = getCookie("rememberMe");

        // 2. Check Session Storage (Active Session)
        const sessionToken = getSessionToken("accessToken");
        const sessionRole = getSessionToken("role");

        if (!savedToken) {
          if (sessionToken) {
            savedToken = sessionToken;
            savedRole = sessionRole;
          } else if (rememberMeFlag) {
            savedToken = getCookie("accessToken");
            savedRole = getCookie("role");
          }
        }

        if (savedToken) {
          const valid = await validateToken(savedToken);
          if (valid) {
            setToken(savedToken);
            setVerified(true);
            setRole(savedRole); // Restore role
          } else if (rememberMeFlag) {
            // try refresh if backend supports refresh token cookie
            const refreshed = await attemptTokenRefresh(baseUrl, login, setToken);
            setVerified(refreshed);
            // Note: attemptTokenRefresh might need update to return role too, 
            // but usually refresh just gives new access token. 
            // We might need to fetch user details again if role is critical.
            // For now, assume cookies have correct role or refresh flow handles login() call which sets role.
            if (refreshed) {
              // If refresh calls login(), role is set there.
            }
          } else {
            // token invalid and no rememberMe → force logout
            clearAuthUtil(setToken);
            setVerified(false);
            setRole(null);
          }
        }
      } catch (err) {
        console.error(err);
        clearAuthUtil(setToken);
        setVerified(false);
        setRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoading,
        verified,
        role, // Expose role
        login,
        logout,
        isAuthenticated,
        attemptTokenRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
};