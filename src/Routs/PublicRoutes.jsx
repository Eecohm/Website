import {Routes, Route } from 'react-router-dom';
import Home from './HomeRouts';
import LoginForm from '../Components/App/Login/Login';
import Register from '../Components/App/Login/Register/Register';
import SignUpForm from '../Components/App/Login/Signup';


const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/register" element={<Register />} />
    <Route path="/signup" element={<SignUpForm />} />
  </Routes>
);

export default PublicRoutes;