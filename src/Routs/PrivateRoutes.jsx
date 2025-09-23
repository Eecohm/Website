import { Routes, Route } from "react-router-dom";
import { useAuth } from "../Components/App/Login/Auth/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import DashBoard from "../Components/App/Dashboard/Dashboard";
import Reports from "../Components/App/Reports/Reports";
import MonthlyFeedbackForm from "../Components/App/Reports/MontlyFeedBackEntry/MontlyFeedBackEntry";
import StudentTable from "../Components/App/Students/Students";
import Admin from "../Components/App/Admin/Admin";
import ClassInfo from "../Components/App/Admin/ClassInfo/ClassInfo";
import RegistrationApproval from "../Components/App/Admin/RegistrationApprovals/RegistartionApprovals";
import Acadamic from "../Components/App/Acadamic/Acadamic";
import AcademicYearCard from "../Components/App/Acadamic/Card/AcademicYearCard";
import ProgramCard from "../Components/App/Acadamic/Card/ProgramCard";
import FacultyCard from "../Components/App/Acadamic/Card/FacultyCard";
import GradeCard from "../Components/App/Acadamic/Card/GradeCard";
import AcademicClassCard from "../Components/App/Acadamic/Card/AcademicClassCard";
import AcademicYearData from "../Components/App/Acadamic/Data/AcademicYearData ";
import ProgramData from "../Components/App/Acadamic/Data/ProgramData";
import FacultyData from "../Components/App/Acadamic/Data/FacultyData ";
import GradeData from "../Components/App/Acadamic/Data/GradeData ";
import AcademicClassData from "../Components/App/Acadamic/Data/AcademicClassData ";
import AdminRoutes from "./DashBoardRoutes/Admin/AdminRoutes";
import ProfileRoutes from "./DashBoardRoutes/Profile/ProfileRoutes";
import AcademicRoutes from "./DashBoardRoutes/Academics/AcademicRoutes";

const RequireAuth = ({ children }) => {
  const { token, isLoading } = useAuth();

  const location = useLocation();

  if (isLoading) {
    return <div>loading......</div>;
  }
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const PrivateRoutes = () => (
  <Routes>
    <Route
      path="/*"
      element={
        <RequireAuth>
          <DashBoard />
        </RequireAuth>
      }
    />
    <Route
      path="/reports"
      element={
        <RequireAuth>
          <Reports />
        </RequireAuth>
      }
    />
    <Route
      path="/students"
      element={
        <RequireAuth>
          <StudentTable />
        </RequireAuth>
      }
    />
    <Route
      path="/admin/*"
      element={
        <RequireAuth>
          <AdminRoutes />
        </RequireAuth>
      }
    />
    <Route
      path="/profile/*"
      element={
        <RequireAuth>
          <ProfileRoutes />
        </RequireAuth>
      }
    />
    <Route
      path="/academic/*"
      element={
        <RequireAuth>
          <AcademicRoutes />
        </RequireAuth>
      }
    />
  </Routes>
);

export default PrivateRoutes;
