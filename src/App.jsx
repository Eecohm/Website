import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/App/Login/Login';
import Home from './Routs/HomeRouts';
import Register from './Components/App/Login/Register';
import DashBoard from './Components/App/Dashboard/Dashboard';
import Reports from './Components/App/Reports/Reports';
import MonthlyFeedbackForm from './Components/App/Reports/MontlyFeedBackEntry/MontlyFeedBackEntry';
import './App.css';
import RoundImage from './Components/AboutUs/RoundImage/RoundImage';
import SignUpForm from './Components/App/Login/Signup';

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reports" element={<Reports />} />
        <Route path='/enter-feedback' element={<MonthlyFeedbackForm />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;