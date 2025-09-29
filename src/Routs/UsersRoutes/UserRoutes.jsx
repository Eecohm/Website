import { Routes, Route } from "react-router-dom";
import UserInfoRoutes from "./infoRoutes";


const UserRoutes = () => (
  <Routes>
    
    <Route path="/info/*" element={<UserInfoRoutes />} />
  </Routes>
);

export default UserRoutes;
