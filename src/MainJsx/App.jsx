import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "@/Routs/index";
import { BaseUrlContext, BaseMediaUrlContext } from "@/Context/BaseUrlContext";
import{ AuthProvider } from "@/Context/AuthContext";

const App = () => {
  // const baseUrl = "http://127.0.0.1:8000/api";
  // const basemediaUrl = "http://127.0.0.1:8000/media/";

  const baseUrl = "https://bishamsinchiury.com.np/api";
  const basemediaUrl = "https://bishamsinchiury.com.np/media/";

  return (
    
      <BaseUrlContext.Provider value={baseUrl}>
        <BaseMediaUrlContext.Provider value={basemediaUrl}>
          <AuthProvider>
            <Router basename="/">
              <AppRoutes />
            </Router>
          </AuthProvider>
        </BaseMediaUrlContext.Provider>
      </BaseUrlContext.Provider>
  );
};

export default App;
