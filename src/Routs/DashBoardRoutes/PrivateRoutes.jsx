import { Routes } from "react-router-dom";
import { DashboardRoutes } from "./DashBoardRoutes";
import { ReportRoutes } from "./ReportRoutes";
import { StudentRoutes } from "./StudentRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { ProfileRoutes } from "./ProfileRoutes";
import { AcademicRoutes } from "./AcademicRoutes";

const PrivateRoutes = () => (
  <Routes>
    {[
      ...DashboardRoutes,
      ...ReportRoutes,
      ...StudentRoutes,
      ...AdminRoutes,
      ...ProfileRoutes,
      ...AcademicRoutes,
    ]}
  </Routes>
);

export default PrivateRoutes;
