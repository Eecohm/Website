import React, { createContext, useState, useEffect, Children, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken")
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
  };

  const logut = () => {
    setToken(null);
    localStorage.removeItem('authToken');
  };

  return(
    <AuthContext.Provider value={{token, login, logut}}>
    {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error ("userAuth must be used insed an AutherProvider");
  }
  return context;
};