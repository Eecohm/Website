import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/App/Login/Login';
import Home from './Routs/HomeRouts';
import Register from './Components/App/Login/Register/Register';
import DashBoard from './Components/App/Dashboard/Dashboard';
import Reports from './Components/App/Reports/Reports';
import MonthlyFeedbackForm from './Components/App/Reports/MontlyFeedBackEntry/MontlyFeedBackEntry';
import styles from './App.module.css';
import ClassInfo from './Components/App/Admin/ClassInfo/ClassInfo';
import Admin from './Components/App/Admin/Admin';
import RegistrationApproval from './Components/App/Admin/RegistrationApprovals/RegistartionApprovals';
import RoundImage from './Components/AboutUs/RoundImage/RoundImage';
import SignUpForm from './Components/App/Login/Signup';
import StudentTable from './Components/App/Students/Students';
import UnderConstruction from './Components/App/UnderConstruction';
import { BaseUrlContext, BaseMediaUrlContext } from './BaseUrlContext';
import AuthProvider from './Components/App/Login/Auth/AuthProvider';
import Questions from './Components/New/Questions';
const App = () => {
  const basemediaUrl = "http://127.0.0.1:8000"
  // const basemediaUrl = "'https://bishamsinchiury.com.np/media/"
  // const baseUrl = 'https://bishamsinchiury.com.np/api';
  const baseUrl = 'http://127.0.0.1:8000/api';
  return (
    <AuthProvider>
    <BaseUrlContext.Provider value={baseUrl}>
    <BaseMediaUrlContext.Provider value={basemediaUrl}>
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reports" element={<Reports />} />
        <Route path='/enter-feedback' element={<MonthlyFeedbackForm />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/students' element={<StudentTable />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/classinfo' element={<ClassInfo />} />
        <Route path='/admin/registrationapproval' element={<RegistrationApproval />} />
        <Route path='/questions/' element={<Questions />} />
        <Route path="*" element={<UnderConstruction />} />

      </Routes>
    </Router>
    </BaseMediaUrlContext.Provider>
    </BaseUrlContext.Provider>
    </AuthProvider>
  );
};

export default App;

