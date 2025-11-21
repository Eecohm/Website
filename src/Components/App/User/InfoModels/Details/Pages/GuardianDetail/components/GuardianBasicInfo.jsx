import React from "react";
import { BasicInfoCard } from "@/Components/App/User/InfoModels/Details/Pages/GlobalComponents/BasicInfoCard";

export const GuardianBasicInfo = ({ guardian, getKycStatusClass }) => (
  <BasicInfoCard
    user={guardian}
    role="guardian"
    getKycStatusClass={getKycStatusClass}
  />
);
