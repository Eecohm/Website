// src/context/AuthProvider.js
import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false); // <-- NEW

  useEffect(() => {
    const savedToken = localStorage.getItem('accessToken');
    if (savedToken) {
      setToken(savedToken);
    }
    setIsAuthChecked(true); // <-- Mark auth as checked
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
  }, [token]);

  if (!isAuthChecked) {
    return <div>Loading...</div>; // Or a spinner or splash screen
  }

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};



export default AuthProvider;
