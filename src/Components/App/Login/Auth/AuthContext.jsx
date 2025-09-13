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
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
  };

  const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;secure;samesite=strict`;
  };

  // Login function - handles both initial login and refresh token data
  const login = (data) => {
    // Set all user data in cookies
    setCookie("accessToken", data.access);
    // Update state
    setToken(data.access);
  };

  // Attempt to refresh token using refresh token cookie
  const attemptTokenRefresh = async () => {
    try {
      const response = await fetch(`${baseUrl}/user/token/refresh/`, {
        method: "POST",
        credentials: "include", // This sends the refresh token cookie
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        // Use the same login function to handle all cookie setting and state updates
        login(data);
        
        return true;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
    
    clearAuthState();
    return false;
  };

  // Clear all authentication state and cookies
  const clearAuthState = () => {
    // Clear all cookies
    deleteCookie("accessToken");
    deleteCookie("refresh_token");
    // Clear state
    setToken(null);
  };

  // Logout function
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
    clearAuthState();
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token;
  };

  // API call wrapper that handles token refresh automatically
  const authenticatedFetch = async (url, options = {}) => {
    const token = getCookie("accessToken");
    
    // Add token to headers
    const headers = {
      ...options.headers,
      ...(token && { "Authorization": `Bearer ${token}` }),
    };

    let response = await fetch(url, {
      ...options,
      headers,
    });

    // If token expired, try to refresh and retry
    if (response.status === 401 && token) {
      const refreshSuccess = await attemptTokenRefresh();
      
      if (refreshSuccess) {
        const newToken = getCookie("accessToken");
        const retryHeaders = {
          ...options.headers,
          "Authorization": `Bearer ${newToken}`,
        };
        
        response = await fetch(url, {
          ...options,
          headers: retryHeaders,
        });
      }
    }

    return response;
  };

  // Check authentication status on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const savedToken = getCookie("accessToken");
        
        if (savedToken) {
          // Verify token is still valid by making a test request
          const response = await fetch(`${baseUrl}/user/login/`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${savedToken}`,
            },
          });

          if (response.ok) {
            // Token is valid, restore user state from cookies
            setToken(savedToken);
          } else {
            // Token is invalid, try to refresh
            await attemptTokenRefresh();
          }
        } else {
          // No token found, try to refresh from refresh token
          await attemptTokenRefresh();
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
        attemptTokenRefresh,
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