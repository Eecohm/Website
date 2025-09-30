import { Routes, Route } from "react-router-dom";

// Forms
import StudentInfoForm from "@/Components/App/User/InfoModels/Forms/Pages/StudentInfoForm/StudentInfoForm";
import OwnerInfoForm from "@/Components/App/User/InfoModels/Forms/Pages/OwnerInfoForm/OwnerInfoForm";
import TeacherInfoForm from "@/Components/App/User/InfoModels/Forms/Pages/TeacherInfoForm/TeacherInfoForm";
import GuardianInfoForm from "@/Components/App/User/InfoModels/Forms/Pages/GuardianInfoForm/GuardianInfoForm";
import EmployeeInfoForm from "@/Components/App/User/InfoModels/Forms/Pages/EmployeeInfoForm/EmployeeInfoForm";
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
