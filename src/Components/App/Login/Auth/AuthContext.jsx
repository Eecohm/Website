import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [kyc_status, setKycStatus] = useState("pending");
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("accessToken");
      const savedUserId = localStorage.getItem("userId");
      const savedRole = localStorage.getItem("role");
      const savedKycStatus = localStorage.getItem("kyc_status");
      const savedVerified = localStorage.getItem("verified");

      if (savedToken) setToken(savedToken);
      if (savedUserId) setUserId(savedUserId);
      if (savedRole) setRole(savedRole);
      if (savedKycStatus) setKycStatus(savedKycStatus);
      if (savedVerified) setVerified(savedVerified);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("userId", data.user_id);
    localStorage.setItem("role", data.role);
    localStorage.setItem("verified", data.verified);
    localStorage.setItem("kyc_status", data.kyc_status);
    localStorage.setItem("accessToken", data.token);

    setUserId(data.user_id);
    setRole(data.role);
    setVerified(data.verified);
    setKycStatus(data.kyc_status);
    setToken(data.token);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setRole(null);
    setKycStatus("pending");
    setVerified(false);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        role,
        kyc_status,
        verified,
        isLoading,
        login,
        logout,
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
