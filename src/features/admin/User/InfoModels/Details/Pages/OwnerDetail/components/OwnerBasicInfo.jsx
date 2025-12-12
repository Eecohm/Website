import React from "react";
import { BasicInfoCard } from "@/features/admin/User/InfoModels/Details/Pages/GlobalComponents/BasicInfoCard";

export const OwnerBasicInfo = ({ owner, getKycStatusClass }) => (
  <BasicInfoCard
    user={owner}
    role="Owner"
    getKycStatusClass={getKycStatusClass}
  />
);
