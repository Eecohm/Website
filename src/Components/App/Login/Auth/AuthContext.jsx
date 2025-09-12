import React, { createContext, useState, useEffect, useContext, use } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [role, setrole] = useState(null);
  const [kyc_status, setkyc_status] = useState("pending");
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("accessToken");
      const savedkycStatus = localStorage.getItem("kycStatus");
      const saveduserId =localStorage.getItem("userId");
      const savedrole = localStorage.getItem("role");
      const savedVerified = localStorage.getItem("verified");
      if (savedToken) {
        setToken(savedToken);
        setVerified(savedVerified);
        setUserId(saveduserId);
        setrole(savedrole);
        setkyc_status(savedkycStatus);
      }
      console.log()
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("userId", data.user_id);
    localStorage.setItem("role", data.role)
    localStorage.setItem("verified", data.verified);
    localStorage.setItem("kycStatus", data.kyc_status);
    localStorage.setItem("accessToken", data.token);
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
        kyc_status,
        verified
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
