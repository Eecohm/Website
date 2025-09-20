import { Routes, Route } from "react-router-dom";
import { useAuth } from "../Components/App/Login/Auth/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import UserValidationGuard from "../Components/App/UserValidationGuard/UserValidationGuard";
import Register from "../Components/App/Login/Register/Register";
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
import KycForm from "../Components/App/Kyc/KycForm";
import KycFormNew from "../Components/App/Kyc/KycFormNew";
import KycFormTest from "../Components/App/Kyc/KycFormTest";
import DiagnosticKycForm from "../Components/App/Kyc/DiagnosticKycForm";
import KycStatus from "../Components/App/Kyc/KycStatus ";
import KycDetailView from "../Components/App/Kyc/KycDetailViewClean";

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

const RequireAuthAndValidation = ({
  children,
  allowIncomplete = false,
  allowPending = false,
}) => {
  return (
    <RequireAuth>
      <UserValidationGuard
        allowIncomplete={allowIncomplete}
        allowPending={allowPending}
      >
        {children}
      </UserValidationGuard>
    </RequireAuth>
  );
};

const PrivateRoutes = () => (
  <Routes>
    {/* Registration route - allows incomplete users to complete their registration */}
    <Route
      path="/register"
      element={
        <RequireAuth>
          <Register />
        </RequireAuth>
      }
    />
    {/* KYC routes - allows verified users to complete KYC process */}
    <Route
      path="/kyc/form"
      element={
        <RequireAuth>
          <KycFormNew />
        </RequireAuth>
      }
    />
    <Route
      path="/kyc/status"
      element={
        <RequireAuth>
          <KycStatus />
        </RequireAuth>
      }
    />
    <Route
      path="/kyc/details"
      element={
        <RequireAuth>
          <KycDetailView />
        </RequireAuth>
      }
    />

    {/* Dashboard main route - requires full verification */}
    <Route
      path="/*"
      element={
        <RequireAuthAndValidation>
          <DashBoard />
        </RequireAuthAndValidation>
      }
    />

    {/* All other dashboard features require full verification */}
    <Route
      path="/reports"
      element={
        <RequireAuthAndValidation>
          <Reports />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/enter-feedback"
      element={
        <RequireAuthAndValidation>
          <MonthlyFeedbackForm />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/students"
      element={
        <RequireAuthAndValidation>
          <StudentTable />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/admin"
      element={
        <RequireAuthAndValidation>
          <Admin />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/admin/classinfo"
      element={
        <RequireAuthAndValidation>
          <ClassInfo />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/admin/registrationapproval"
      element={
        <RequireAuthAndValidation>
          <RegistrationApproval />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/profile"
      element={
        <RequireAuthAndValidation>
          <Profile />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/profile/organization"
      element={
        <RequireAuthAndValidation>
          <OrganizationForm />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/profile/profile-data"
      element={
        <RequireAuthAndValidation>
          <OrganizationData />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/profile/sub-organization"
      element={
        <RequireAuthAndValidation>
          <SubOrganizationData />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/profile/add-sub-organization"
      element={
        <RequireAuthAndValidation>
          <SubOrganizationForm />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/profile/suborg-details/:id"
      element={
        <RequireAuthAndValidation>
          <SubOrgDetails />
        </RequireAuthAndValidation>
      }
    />

    <Route
      path="/profile/sub-org/:id"
      element={
        <RequireAuthAndValidation>
          <SubOrganizationData />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/profile/view-image/:type"
      element={
        <RequireAuthAndValidation>
          <ViewImage />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/academic"
      element={
        <RequireAuthAndValidation>
          <Acadamic />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/academic/academic-year"
      element={
        <RequireAuthAndValidation>
          <AcademicYearCard />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/academic/program"
      element={
        <RequireAuthAndValidation>
          <ProgramCard />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/academic/faculty"
      element={
        <RequireAuthAndValidation>
          <FacultyCard />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/academic/grade"
      element={
        <RequireAuthAndValidation>
          <GradeCard />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/academic/academic-class"
      element={
        <RequireAuthAndValidation>
          <AcademicClassCard />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/academic/academic-year/academic-data"
      element={
        <RequireAuthAndValidation>
          <AcademicYearData />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/academic/program/program-data"
      element={
        <RequireAuthAndValidation>
          <ProgramData />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/academic/faculty/faculty-data"
      element={
        <RequireAuthAndValidation>
          <FacultyData />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/academic/grade/grade-data"
      element={
        <RequireAuthAndValidation>
          <GradeData />
        </RequireAuthAndValidation>
      }
    />
    <Route
      path="/academic/academic-class/academic-data"
      element={
        <RequireAuthAndValidation>
          <AcademicClassData />
        </RequireAuthAndValidation>
      }
    />
  </Routes>
);

export default PrivateRoutes;
