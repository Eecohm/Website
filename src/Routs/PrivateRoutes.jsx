import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../Components/App/Login/Auth/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import DashBoard from '../Components/App/Dashboard/Dashboard';
import Reports from '../Components/App/Reports/Reports';
import MonthlyFeedbackForm from '../Components/App/Reports/MontlyFeedBackEntry/MontlyFeedBackEntry';
import StudentTable from '../Components/App/Students/Students';
import Admin from '../Components/App/Admin/Admin';
import ClassInfo from '../Components/App/Admin/ClassInfo/ClassInfo';
import RegistrationApproval from '../Components/App/Admin/RegistrationApprovals/RegistartionApprovals';


const RequireAuth = ({children}) => {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children
}

const PrivateRoutes = () => (
  <Routes>
    <Route
      path=""
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
      path="/enter-feedback"
      element={
        <RequireAuth>
          <MonthlyFeedbackForm />
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
      path="/admin"
      element={
        <RequireAuth>
          <Admin />
        </RequireAuth>
      }
    />
    <Route
      path="/admin/classinfo"
      element={
        <RequireAuth>
          <ClassInfo />
        </RequireAuth>
      }
    />
    <Route
      path="/admin/registrationapproval"
      element={
        <RequireAuth>
          <RegistrationApproval />
        </RequireAuth>
      }
    />
  </Routes>
);

export default PrivateRoutes;