import { Routes, Route } from "react-router-dom";
import Home from "./HomeRouts";
import LoginForm from "../Components/App/Login/Loginform/Login";
import Register from "../Components/App/Login/Register/Register";
import SignUpForm from "../Components/App/Login/signup/SignUpForm";
import Portfolio from "../Components/App/Profile/Portfolio/Portfolio";
import UnderConstruction from "@/Components/App/UnderConstruction";

const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/register" element={<Register />} />
    <Route path="/signup" element={<SignUpForm />} />
    <Route path="/college-portfolio" element={<Portfolio />} />
    <Route path="*" element={<UnderConstruction />} />
  </Routes>
);

export default PublicRoutes;
