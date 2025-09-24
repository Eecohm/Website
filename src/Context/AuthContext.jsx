
import React, { createContext, useState, useEffect, useContext } from "react";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { setCookie, getCookie, deleteCookie } from "./Auth/Cookies";
import { attemptTokenRefresh } from "./Auth/TokenRefresh";
import { clearAuthState as clearAuthUtil } from "./Auth/clearAuthState";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [verified, setVerified] = useState(false)
  const baseUrl = useBaseUrl();
  
  const login = (data, rememberMe = false) => {
    setToken(data.access);
    if (rememberMe) {
      setCookie("accessToken", data.access, 30)
      setCookie("rememberMe", "true", 30);
    } else {
      deleteCookie("accessToken");
      deleteCookie("rememberMe");
    }
  };

  // Logout function
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

        // 1. Check for persistent cookie if rememberMe is checked
        const rememberMeFlag = getCookie("rememberMe");
        if (!savedToken && rememberMeFlag) {
          savedToken = getCookie("accessToken");
        }

        if (savedToken) {
          const valid = await validateToken(savedToken);
          if (valid) {
            setToken(savedToken);
            setVerified(true);
          } else if (rememberMeFlag) {
            // try refresh if backend supports refresh token cookie
            const refreshed = await attemptTokenRefresh(baseUrl, login, setToken);
            setVerified(refreshed);
          } else {
            // token invalid and no rememberMe → force logout
            clearAuthUtil(setToken);
            setVerified(false);
          }
        }
      } catch (err) {
        console.error(err);
        clearAuthUtil(setToken);
        setVerified(false);
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