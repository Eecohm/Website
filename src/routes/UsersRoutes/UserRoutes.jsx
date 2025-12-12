import { Routes, Route } from "react-router-dom";
import UserInfoRoutes from "./infoRoutes";
import UserDetail from "./detailRoutes";


const UserRoutes = () => (
  <Routes>
    
    <Route path="/info/*" element={<UserInfoRoutes />} />
    <Route path="/detail/*" element={<UserDetail />} />
  </Routes>
);

export default UserRoutes;
