import React from "react";
import { EmployeeBasicInfo } from "@/Components/App/User/InfoModels/Details/Pages/EmployeeDetail/components/EmployeeBasicInfo";
import { EmployeeContactSection } from "@/Components/App/User/InfoModels/Details/Pages/EmployeeDetail/components/EmployeeContactSection";
import { EmployeeAddressSection } from "@/Components/App/User/InfoModels/Details/Pages/EmployeeDetail/components/EmployeeAddressSection";
import { EmployeeIdentitySection } from "@/Components/App/User/InfoModels/Details/Pages/EmployeeDetail/components/EmployeeIdentitySection";
import { EmployeeDocumentsSection } from "@/Components/App/User/InfoModels/Details/Pages/EmployeeDetail/components/EmployeeDocumentsSection";
import styles from "@/Components/App/User/InfoModels/Details/Pages/EmployeeDetail/components/EmployeeBasicInfo.module.css";
import sectionStyles from "@/Components/App/User/InfoModels/Details/Pages/EmployeeDetail/components/SectionCard.module.css";

export const EmployeeDetailsCard = ({
  employee,
  getKycStatusClass,
  onViewDocument,
}) => (
  <div className={styles.idCard}>
    <EmployeeBasicInfo
      employee={employee}
      getKycStatusClass={getKycStatusClass}
    />

    <div className={sectionStyles.sectionsGrid}>
      <EmployeeContactSection employee={employee} />
      <EmployeeAddressSection employee={employee} />
      <EmployeeIdentitySection employee={employee} />
    </div>

    <EmployeeDocumentsSection
      employee={employee}
      onViewDocument={onViewDocument}
    />
  </div>
);
