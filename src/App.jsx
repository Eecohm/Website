import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routs/index";
import { BaseUrlContext, BaseMediaUrlContext } from "./BaseUrlContext";
import { AuthProvider } from "./Components/App/Login/Auth/AuthContext";

const App = () => {
  // const baseUrl = 'http://127.0.0.1:8000/api';
  // const basemediaUrl = 'http://127.0.0.1:8000/media/';

  const baseUrl = "https://bishamsinchiury.com.np/api";
  const basemediaUrl = "https://bishamsinchiury.com.np/media/";

  return (
    <AuthProvider>
      <BaseUrlContext.Provider value={baseUrl}>
        <BaseMediaUrlContext.Provider value={basemediaUrl}>
          <Router basename="/">
            <AppRoutes />
          </Router>
        </BaseMediaUrlContext.Provider>
      </BaseUrlContext.Provider>
    </AuthProvider>
  );
};

export default App;
