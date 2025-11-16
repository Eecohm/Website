import { useNavigate } from "react-router-dom";
import UserManagement from "./UserManagement/UserManagement";
import NavBar from "../NavBar/NavBar";

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
