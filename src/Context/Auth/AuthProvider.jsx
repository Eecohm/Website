import React, { createContext, useState, useEffect } from "react";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { verifyToken } from "./verifyToken";
import { login } from "./login";
import { logout } from "./logout";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const baseUrl = useBaseUrl();

  const isAuthenticated = () => verified;

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { savedToken, isValid } = await verifyToken(baseUrl, login);
        if (isValid) {
          setToken(savedToken);
          setVerified(true);
        } else {
          setToken(null);
          setVerified(false);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setToken(null);
        setVerified(false);
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
        login: (data, rememberMe) => login(data, rememberMe, setToken, setVerified),
        logout: () => logout(baseUrl, setToken, setVerified),
        isAuthenticated,
        attemptTokenRefresh: (loginFn) => attemptTokenRefresh(baseUrl, loginFn, setToken),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;