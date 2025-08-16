// routes/dashboard/ProfileRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../../comp/profile/Profile";
import OrganizationForm from "../../comp/profile/OrganizationForm";
import OrganizationData from "../../comp/profile/OrganizationData";
import SubOrganizationForm from "../../comp/profile/SubOrganizationForm";
import SubOrganizationData from "../../comp/profile/SubOrganizationData";
import ViewImage from "../../comp/profile/ViewImage";

const ProfileRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route path="/organization" element={<OrganizationForm />} />
      <Route path="/profile-data" element={<OrganizationData />} />
      <Route path="/sub-organization" element={<SubOrganizationForm />} />
      <Route path="/sub-org/:id" element={<SubOrganizationData />} />
      <Route path="/view-image/:type" element={<ViewImage />} />
    </Routes>
  );
};

export default ProfileRoutes;
