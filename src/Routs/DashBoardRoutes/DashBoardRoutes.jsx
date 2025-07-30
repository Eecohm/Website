// import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// import Profile from "../../Components/App/Profile/profile";
// import { useAuth } from "../../Components/App/Login/Auth/AuthContext";

// const DashBoardRoutes = () => {
//   const RequireAuth = ({ children }) => {
//     const { token } = useAuth();
//     const location = useLocation();

//     if (!token) {
//       return <Navigate to="/login" state={{ from: location }} replace />;
//     }
//     return children;
//   };
//   return (
//     <Routes>
//       <Route
//         path="/admin/profile"
//         element={
//           <RequireAuth>
//             <Profile />
//           </RequireAuth>
//         }
//       />
//     </Routes>
//   );
// };

// export default DashBoardRoutes;
