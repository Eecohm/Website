import React from "react";
import { BasicInfoCard } from "@/Components/App/User/InfoModels/Details/Pages/GlobalComponents/BasicInfoCard";

export const EmployeeBasicInfo = ({ employee, getKycStatusClass }) => (
  <BasicInfoCard
    user={employee}
    role="Employee"
    getKycStatusClass={getKycStatusClass}
  />
);
