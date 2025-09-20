import React, { createContext, useState, useEffect, useContext } from "react";
import { useBaseUrl } from "../../../../BaseUrlContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = useBaseUrl();

  // Cookie utility functions
  const setCookie = (name, value, days = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
  };

  const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;secure;samesite=strict`;
  };

  // Login function - handles login and sets token
  const login = (data) => {
    // Set access token in cookies (valid for 1 year)
    setCookie("accessToken", data.access, 365); // 365 days = 1 year
    // Update state
    setToken(data.access);
  };

  // Clear all authentication state and cookies
  const clearAuthState = () => {
    // Clear access token cookie
    deleteCookie("accessToken");
    // Clear state
    setToken(null);
  };

  // Logout function
  const logout = async () => {
    try {
      // Call logout endpoint to invalidate token on server
      await fetch(`${baseUrl}/user/logout/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Logout API call failed:", error);
      // Continue with logout even if API call fails
    }

    // Always clear local state regardless of API success
    clearAuthState();
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token;
  };

  // API call wrapper with authentication
  const authenticatedFetch = async (url, options = {}) => {
    const token = getCookie("accessToken");

    // Add token to headers
    const headers = {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // If token is invalid (401), clear auth state and redirect to login
    if (response.status === 401) {
      console.warn("Token expired or invalid, logging out");
      clearAuthState();
      // Optionally redirect to login - this can be handled by the calling component
    }

    return response;
  };

  // Check authentication status on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const savedToken = getCookie("accessToken");

        if (savedToken) {
          // Since token is valid for 1 year, just restore it
          // No need to verify with server on every mount
          setToken(savedToken);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        clearAuthState();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [baseUrl]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoading,
        login,
        logout,
        isAuthenticated,
        authenticatedFetch,
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
