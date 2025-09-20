import { Route } from "react-router-dom";
import RequireAuth from "../RequireAuth";
import Admin from "../../Components/App/Admin/Admin";
import ClassInfo from "../../Components/App/Admin/ClassInfo/ClassInfo";
import RegistrationApproval from "../../Components/App/Admin/RegistrationApprovals/RegistartionApprovals";

export const AdminRoutes = [
  <Route
    key="admin"
    path="/admin"
    element={
      <RequireAuth>
        <Admin />
      </RequireAuth>
    }
  />,
  <Route
    key="classinfo"
    path="/admin/classinfo"
    element={
      <RequireAuth>
        <ClassInfo />
      </RequireAuth>
    }
  />,
  <Route
    key="registration"
    path="/admin/registrationapproval"
    element={
      <RequireAuth>
        <RegistrationApproval />
      </RequireAuth>
    }
  />,
];
