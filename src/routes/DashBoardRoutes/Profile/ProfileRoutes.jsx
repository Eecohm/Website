import { Routes, Route } from "react-router-dom";
import Profile from "@/features/admin/Profile/profile";
import OrganizationForm from "@/features/admin/Profile/OrganizationForm";
import OrganizationData from "@/features/admin/Profile/OrganizationData";
import SubOrganizationForm from "@/features/admin/Profile/SubOrganizationForm";
import SubOrganizationData from "@/features/admin/Profile/SubOrganizationData";
import SubOrgDetails from "@/features/admin/Profile/SubOrgDetails";
import ViewImage from "@/features/admin/Profile/ViewImage";

const ProfileRoutes = () => (
  <>
  <Routes>
    <Route
      path="/"
      element={
          <Profile />
      }
    />
    <Route
      path="/organization"
      element={
          <OrganizationForm />
      }
    />
    <Route
      path="/profile-data"
      element={
          <OrganizationData />
      }
    />
    <Route
      path="/sub-organization"
      element={
          <SubOrganizationData />
      }
    />
    <Route
      path="/add-sub-organization"
      element={
          <SubOrganizationForm />
      }
    />
    <Route
      path="/suborg-details/:id"
      element={
          <SubOrgDetails />
      }
    />
    <Route
      path="/sub-org/:id"
      element={
          <SubOrganizationData />
      }
    />
    <Route
      path="/view-image/:type"
      element={
          <ViewImage />
      }
    />
    </Routes>
  </>
);

export default ProfileRoutes;
