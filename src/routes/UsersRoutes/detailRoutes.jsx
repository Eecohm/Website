import { Routes, Route } from "react-router-dom";

// Forms
import StudentDetail from "@/features/admin/User/InfoModels/Details/Pages/StudentDetail/StudentDetail";
import OwnerDetail from "@/features/admin/User/InfoModels/Details/Pages/OwnerDetail/OwnerDetail";
import TeacherDetail from "@/features/admin/User/InfoModels/Details/Pages/TeacherDetail/TeacherDetail";
import GuardianDetial from "@/features/admin/User/InfoModels/Details/Pages/GuardianDetail/GuardianDetail";
import EmployeeDetail from "@/features/admin/User/InfoModels/Details/Pages/EmployeeDetail/EmployeeDetail";
import AdminDetail from "@/features/admin/User/InfoModels/Details/Pages/AdminDetail/AdminDetail";

const UserDetail = () => (
  <Routes>
    {/* Routes with optional :id parameter */}
    <Route path="/student/detail" element={<StudentDetail />} />
    <Route path="/student/detail/:id" element={<StudentDetail />} />

    <Route path="/guardian/detail" element={<GuardianDetial />} />
    <Route path="/guardian/detail/:id" element={<GuardianDetial />} />

    <Route path="/employee/detail" element={<EmployeeDetail />} />
    <Route path="/employee/detail/:id" element={<EmployeeDetail />} />

    <Route path="/owner/detail" element={<OwnerDetail />} />
    <Route path="/owner/detail/:id" element={<OwnerDetail />} />

    <Route path="/teacher/detail" element={<TeacherDetail />} />
    <Route path="/teacher/detail/:id" element={<TeacherDetail />} />

    <Route path="/admin/detail" element={<AdminDetail />} />
    <Route path="/admin/detail/:id" element={<AdminDetail />} />
  </Routes>
);

export default UserDetail;
