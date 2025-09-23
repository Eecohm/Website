import { Routes, Route } from "react-router-dom";
import Profile from "@/Components/App/Profile/profile";
import OrganizationForm from "@/Components/App/Profile/OrganizationForm";
import OrganizationData from "@/Components/App/Profile/OrganizationData";
import SubOrganizationForm from "@/Components/App/Profile/SubOrganizationForm";
import SubOrganizationData from "@/Components/App/Profile/SubOrganizationData";
import SubOrgDetails from "@/Components/App/Profile/SubOrgDetails";
import ViewImage from "@/Components/App/Profile/ViewImage";

const ProfileRoutes = () => (
  <>
  <Routes>
    <Route
      path=""
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
