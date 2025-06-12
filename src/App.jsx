import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/App/Login/Login';
import Home from './Routs/HomeRouts';
import Register from './Components/App/Login/Register/Register';
import DashBoard from './Components/App/Dashboard/Dashboard';
import Reports from './Components/App/Reports/Reports';
import MonthlyFeedbackForm from './Components/App/Reports/MontlyFeedBackEntry/MontlyFeedBackEntry';
import styles from './App.module.css';
import ClassInfo from './Components/App/Admin/ClassInfo.jsx/ClassInfo';
import Admin from './Components/App/Admin/Admin'
import RoundImage from './Components/AboutUs/RoundImage/RoundImage';
import SignUpForm from './Components/App/Login/Signup';
import StudentTable from './Components/App/Students/Students';
import UnderConstruction from './Components/App/UnderConstruction';
import { BaseUrlContext } from './BaseUrlContext';
import AuthProvider from './Components/App/Login/Auth/AuthProvider';
const App = () => {
  const baseUrl = 'https://bishamsinchiury.com.np/api';
  return (
    <AuthProvider>
    <BaseUrlContext.Provider value={baseUrl}>
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
        <Route path="*" element={<UnderConstruction />} />
      </Routes>
    </Router>
    </BaseUrlContext.Provider>
    </AuthProvider>
  );
};

export default App;
<<<<<<< HEAD
// Sugita
=======
//Bibek Bishwokarma
>>>>>>> 5e56b8ec65b5806ba283db700dd7e7858b073b07
