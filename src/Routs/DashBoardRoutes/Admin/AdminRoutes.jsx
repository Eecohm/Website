import { Routes, Route } from "react-router-dom";
import Admin from "@/Components/App/Admin/Admin";
import ClassInfo from "@/Components/App/Admin/ClassInfo/ClassInfo";
import RegistrationApproval from "@/Components/App/Admin/RegistrationApprovals/RegistartionApprovals";
import UserDetail from "@/Components/App/Admin/UserManagement/Components/UserDetail";
import UserManagementPage from "@/Components/App/Admin/UserManagementPage";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<Admin />} />
    <Route path="classinfo" element={<ClassInfo />} />
    <Route path="registrationapproval" element={<RegistrationApproval />} />
    <Route path="users/detail/:category/detail" element={<UserDetail />} />
    <Route path="users" element={<UserManagementPage />} />
  </Routes>
);

export default AdminRoutes;
