import { Routes, Route } from "react-router-dom";
import Home from "./HomeRoutes";
import LoginForm from "../features/admin/Login/Login/Login";
import Register from "../features/admin/Login/Register/Register";
import SignUpForm from "../features/admin/Login/signup/SignUpForm";
import Portfolio from "../features/admin/Profile/Portfolio/Portfolio";
import UnderConstruction from "@/features/admin/UnderConstruction";

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
