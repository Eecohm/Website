import React from "react";
import { BasicInfoCard } from "../../GlobalComponents/BasicInfoCard";

export const GuardianBasicInfo = ({ guardian, getKycStatusClass }) => (
  <BasicInfoCard
    user={guardian}
    role="guardian"
    getKycStatusClass={getKycStatusClass}
  />
);
