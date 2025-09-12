import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [kycStatus, setKycStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("accessToken");
      if (savedToken) {
        setToken(savedToken);
        fetchUserInfo(savedToken);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // login: save token and immediately fetch user info
  const login = (data) => {
    setToken(data.access);
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("userId", data.user_id);
    localStorage.setItem("userEmail", data.email);

    fetchUserInfo(data.access);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setRole(null);
    setIsVerified(false);
    setKycStatus(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("role");
    localStorage.removeItem("verified");
    localStorage.removeItem("kycStatus");
  };

  const fetchUserInfo = async (authToken = token) => {
    if (!authToken) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user/me/", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error:", response.status, errorText);
        throw new Error("Failed to fetch user info");
      }

      const data = await response.json();

      setUserId(data.id);
      setRole(data.role);
      setIsVerified(data.verified);
      setKycStatus(data.kyc_status);

      // keep localStorage in sync
      localStorage.setItem("role", data.role);
      localStorage.setItem("verified", data.verified);
      localStorage.setItem("kycStatus", data.kyc_status);
      if (data.email) localStorage.setItem("userEmail", data.email);
    } catch (error) {
      console.error("Error fetching user info:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        role,
        isVerified,
        kycStatus,
        isLoading,
        login,
        logout,
        refreshUser: fetchUserInfo,
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
