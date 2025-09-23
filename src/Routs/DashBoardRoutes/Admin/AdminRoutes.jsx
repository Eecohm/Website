import { Routes, Route } from "react-router-dom";
import Admin from "@/Components/App/Admin/Admin";
import ClassInfo from "@/Components/App/Admin/ClassInfo/ClassInfo";
import RegistrationApproval from "@/Components/App/Admin/RegistrationApprovals/RegistartionApprovals";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<Admin />} />
    <Route path="classinfo" element={<ClassInfo />} />
    <Route path="registrationapproval" element={<RegistrationApproval />} />
  </Routes>
);

export default AdminRoutes;
