import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './Components/App/Login/Login';
import Home from './Routs/HomeRouts';
import DashBoard from './Components/App/Dashboard/Dashboard'

import './App.css';

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route
          path="/*"
          element={
           <Home />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
};

export default App;