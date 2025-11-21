import { useNavigate } from "react-router-dom";
import UserManagement from "@/Components/App/Admin/UserManagement/UserManagement";
import NavBar from "@/Components/App/NavBar/NavBar";

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
