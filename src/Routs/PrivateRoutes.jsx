import { Routes, Route } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import DashBoard from "../Components/App/Dashboard/Dashboard";
import Reports from "../Components/App/Reports/Reports";
import StudentTable from "../Components/App/Students/Students";
import AdminRoutes from "./DashBoardRoutes/Admin/AdminRoutes";
import ProfileRoutes from "./DashBoardRoutes/Profile/ProfileRoutes";
import AcademicRoutes from "./DashBoardRoutes/Academics/AcademicRoutes";
import Accounts from "@/Components/App/Accounts/Accounts";
import Tasks from "@/Components/App/Tasks/Tasks";
import Inventory from "@/Components/App/Inventory/Inventory";
import Teachers from "@/Components/App/Teachers/Teachers";
import UserRoutes from "./UsersRoutes/UserRoutes";

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
    <Route
      path="/users/*"
      element={
        <RequireAuth>
          <UserRoutes />
        </RequireAuth>
      }
    />
  </Routes>
  
);

export default PrivateRoutes;
