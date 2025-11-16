import React from "react";
import { BasicInfoCard } from "../../GlobalComponents/BasicInfoCard";

export const EmployeeBasicInfo = ({ employee, getKycStatusClass }) => (
  <BasicInfoCard
    user={employee}
    role="Employee"
    getKycStatusClass={getKycStatusClass}
  />
);
