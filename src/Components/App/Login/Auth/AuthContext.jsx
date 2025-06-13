import React, { createContext, useContext } from 'react';

// Create AuthContext for global token
const AuthContext = createContext();

// Custom hook to access token
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext, useAuth };