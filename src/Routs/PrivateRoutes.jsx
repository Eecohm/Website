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
import Profile from "../Components/App/Profile/profile";
import OrganizationForm from "../Components/App/Profile/OrganizationForm";
import OrganizationData from "../Components/App/Profile/OrganizationData";
import SubOrganizationForm from "../Components/App/Profile/SubOrganizationForm";
import SubOrganizationData from "../Components/App/Profile/SubOrganizationData";
import SubOrgDetails from "../Components/App/Profile/SubOrgDetails";
import ViewImage from "../Components/App/Profile/ViewImage";
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

const RequireAuth = ({ children, onlyDashboard = false }) => {
  const { token, isLoading, verified, kyc_Status } = useAuth();

  const location = useLocation();

  if (isLoading) {
    return <div>loading......</div>;
  }
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!verified && !onlyDashboard) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const PrivateRoutes = () => (
  <Routes>
    <Route
      path="/*"
      element={
        <RequireAuth onlyDashboard>
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
    <Route
      path="/profile"
      element={
        <RequireAuth>
          <Profile />
        </RequireAuth>
      }
    />
    <Route
      path="/profile/organization"
      element={
        <RequireAuth>
          <OrganizationForm />
        </RequireAuth>
      }
    />
    <Route
      path="/profile/profile-data"
      element={
        <RequireAuth>
          <OrganizationData />
        </RequireAuth>
      }
    />
    <Route
      path="/profile/sub-organization"
      element={
        <RequireAuth>
          <SubOrganizationData />
        </RequireAuth>
      }
    />
    <Route
      path="/profile/add-sub-organization"
      element={
        <RequireAuth>
          <SubOrganizationForm />
        </RequireAuth>
      }
    />
    <Route
      path="/profile/suborg-details/:id"
      element={
        <RequireAuth>
          <SubOrgDetails />
        </RequireAuth>
      }
    />

    <Route
      path="/profile/sub-org/:id"
      element={
        <RequireAuth>
          <SubOrganizationData />
        </RequireAuth>
      }
    />
    <Route
      path="/profile/view-image/:type"
      element={
        <RequireAuth>
          <ViewImage />
        </RequireAuth>
      }
    />
    <Route
      path="/academic"
      element={
        <RequireAuth>
          <Acadamic />
        </RequireAuth>
      }
    />
    <Route
      path="/academic/academic-year"
      element={
        <RequireAuth>
          <AcademicYearCard />
        </RequireAuth>
      }
    />
    <Route
      path="/academic/program"
      element={
        <RequireAuth>
          <ProgramCard />
        </RequireAuth>
      }
    />
    <Route
      path="/academic/faculty"
      element={
        <RequireAuth>
          <FacultyCard />
        </RequireAuth>
      }
    />
    <Route
      path="/academic/grade"
      element={
        <RequireAuth>
          <GradeCard />
        </RequireAuth>
      }
    />
    <Route
      path="/academic/academic-class"
      element={
        <RequireAuth>
          <AcademicClassCard />
        </RequireAuth>
      }
    />
    <Route
      path="/academic/academic-year/academic-data"
      element={
        <RequireAuth>
          <AcademicYearData />
        </RequireAuth>
      }
    />
    <Route
      path="/academic/program/program-data"
      element={
        <RequireAuth>
          <ProgramData />
        </RequireAuth>
      }
    />
    <Route
      path="/academic/faculty/faculty-data"
      element={
        <RequireAuth>
          <FacultyData />
        </RequireAuth>
      }
    />
    <Route
      path="/academic/grade/grade-data"
      element={
        <RequireAuth>
          <GradeData />
        </RequireAuth>
      }
    />
    <Route
      path="/academic/academic-class/academic-data"
      element={
        <RequireAuth>
          <AcademicClassData />
        </RequireAuth>
      }
    />
  </Routes>
);

export default PrivateRoutes;
