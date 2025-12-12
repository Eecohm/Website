import { useNavigate } from "react-router-dom";
import UserManagement from "@/features/admin/Admin/UserManagement/UserManagement";
import NavBar from "@/features/admin/NavBar/NavBar";

const UserManagementPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard/admin");
  };

  return (
    <>
      <NavBar />
      <UserManagement onBack={handleBack} />
    </>
  );
};

export default UserManagementPage;
