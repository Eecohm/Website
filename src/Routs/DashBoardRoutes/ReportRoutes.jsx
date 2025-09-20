import { Route } from "react-router-dom";
import RequireAuth from "../RequireAuth";
import Reports from "../../Components/App/Reports/Reports";
import MonthlyFeedbackForm from "../../Components/App/Reports/MontlyFeedBackEntry/MontlyFeedBackEntry";

export const ReportRoutes = [
  <Route
    key="reports"
    path="/reports"
    element={
      <RequireAuth>
        <Reports />
      </RequireAuth>
    }
  />,
  <Route
    key="feedback"
    path="/enter-feedback"
    element={
      <RequireAuth>
        <MonthlyFeedbackForm />
      </RequireAuth>
    }
  />,
];
