import { Routes, Route } from "react-router-dom";

// Forms
import StudentInfoForm from "@/Components/App/User/InfoModels/Forms/StudentInfoForm";
import GuardianInfoForm from "@/Components/App/User/InfoModels/Forms/GuardianInfoForm";
import EmployeeInfoForm from "@/Components/App/User/InfoModels/Forms/EmployeeInfoForm";
import OwnerInfoForm from "@/Components/App/User/InfoModels/Forms/OwnerInfoForm";
import TeacherInfoForm from "@/Components/App/User/InfoModels/Forms/TeacherInfoForm";


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
