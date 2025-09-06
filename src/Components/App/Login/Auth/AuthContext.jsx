import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [role, setrole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [kycStatus, setKycStatus] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("accessToken");
      const setUserId = localStorage.getItem("userId");
      const setrole = localStorage.getItem("role");
      const setKycStatus = localStorage.getItem("kyc_Status");
      const setVerified = localStorage.getItem("verified");
      if (savedToken) {
        setToken(savedToken);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("accessToken", newToken);
  };

  const logut = () => {
    setToken(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logut,
        isLoading,
        userId,
        role,
        verified,
        kycStatus,
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
