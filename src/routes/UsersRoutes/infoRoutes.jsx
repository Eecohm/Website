import { Routes, Route } from "react-router-dom";

// Forms
import StudentInfoForm from "@/features/admin/User/InfoModels/Forms/Pages/StudentInfoForm/StudentInfoForm";
import OwnerInfoForm from "@/features/admin/User/InfoModels/Forms/Pages/OwnerInfoForm/OwnerInfoForm";
import TeacherInfoForm from "@/features/admin/User/InfoModels/Forms/Pages/TeacherInfoForm/TeacherInfoForm";
import GuardianInfoForm from "@/features/admin/User/InfoModels/Forms/Pages/GuardianInfoForm/GuardianInfoForm";
import EmployeeInfoForm from "@/features/admin/User/InfoModels/Forms/Pages/EmployeeInfoForm/EmployeeInfoForm";
const UserInfoRoutes = () => (
  <Routes>
    <Route path="/student/form" element={<StudentInfoForm />} />
    <Route path="/guardian/form" element={<GuardianInfoForm />} />
    <Route path="/employee/form" element={<EmployeeInfoForm />} />
    <Route path="/owner/form" element={<OwnerInfoForm />} />
    <Route path="/teacher/form" element={<TeacherInfoForm />} />
  </Routes>
);

export default UserInfoRoutes;
