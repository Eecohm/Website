import { Route } from "react-router-dom";
import RequireAuth from "../RequireAuth";
import StudentTable from "../../Components/App/Students/Students";

export const StudentRoutes = [
  <Route
    key="students"
    path="/students"
    element={
      <RequireAuth>
        <StudentTable />
      </RequireAuth>
    }
  />,
];
