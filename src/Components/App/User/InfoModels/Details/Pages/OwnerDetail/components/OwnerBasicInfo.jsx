import React from "react";
import { BasicInfoCard } from "../../GlobalComponents/BasicInfoCard";

export const OwnerBasicInfo = ({ owner, getKycStatusClass }) => (
  <BasicInfoCard
    user={owner}
    role="Owner"
    getKycStatusClass={getKycStatusClass}
  />
);
