import { Routes, Route } from "react-router-dom";
import Admin from "@/features/admin/Admin/Admin";
import ClassInfo from "@/features/admin/Admin/ClassInfo/ClassInfo";
import RegistrationApproval from "@/features/admin/Admin/RegistrationApprovals/RegistartionApprovals";
import UserDetail from "@/features/admin/Admin/UserManagement/Components/UserDetail";
import UserManagementPage from "@/features/admin/Admin/UserManagementPage";

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
