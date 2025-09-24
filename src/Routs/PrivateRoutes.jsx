import { Routes, Route } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import DashBoard from "../Components/App/Dashboard/Dashboard";
import Reports from "../Components/App/Reports/Reports";
import StudentTable from "../Components/App/Students/Students";
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
