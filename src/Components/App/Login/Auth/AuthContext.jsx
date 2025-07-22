import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
    }
    setIsAuthLoaded(true);
  }, []);

  const login = (newToken) => {
    localStorage.setItem('accessToken', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
