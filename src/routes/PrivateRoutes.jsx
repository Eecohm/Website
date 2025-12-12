import { Routes, Route } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import DashBoard from "../features/admin/Dashboard/Dashboard";
import Reports from "../features/admin/Reports/Reports";
import StudentTable from "../features/admin/Students/Students";
import AdminRoutes from "./DashBoardRoutes/Admin/AdminRoutes";
import ProfileRoutes from "./DashBoardRoutes/Profile/ProfileRoutes";
import AcademicRoutes from "./DashBoardRoutes/Academics/AcademicRoutes";
import Accounts from "@/features/admin/Accounts/Accounts";
import Tasks from "@/features/admin/Tasks/Tasks";
import Inventory from "@/features/admin/Inventory/Inventory";
import Teachers from "@/features/admin/Teachers/Teachers";
import UserRoutes from "./UsersRoutes/UserRoutes";

const RequireToken = ({ children }) => {
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

const RequireAuth = ({ children }) => {
  const { token, isLoading, verified } = useAuth();

  const location = useLocation();

  if (isLoading) {
    return <div>loading......</div>;
  }
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!verified) {
    // redirect unverified users to dashboard
    console.log(verified);
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

const PrivateRoutes = () => (
  <Routes>
    <Route
      path="/users/*"
      element={
        <RequireToken>
          <UserRoutes />
        </RequireToken>
      }
    />
    <Route
      path="/*"
      element={
        <RequireToken>
          <DashBoard />
        </RequireToken>
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
    <Route
      path="/accounts/*"
      element={
        <RequireAuth>
          <Accounts />
        </RequireAuth>
      }
    />
    <Route
      path="/tasks/*"
      element={
        <RequireAuth>
          <Tasks />
        </RequireAuth>
      }
    />
    <Route
      path="/inventory/*"
      element={
        <RequireAuth>
          <Inventory />
        </RequireAuth>
      }
    />
    <Route
      path="/teachers/*"
      element={
        <RequireAuth>
          <Teachers />
        </RequireAuth>
      }
    />
  </Routes>
);

export default PrivateRoutes;
