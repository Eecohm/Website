import React from "react";
import { EmployeeBasicInfo } from "@/features/admin/User/InfoModels/Details/Pages/EmployeeDetail/components/EmployeeBasicInfo";
import { EmployeeContactSection } from "@/features/admin/User/InfoModels/Details/Pages/EmployeeDetail/components/EmployeeContactSection";
import { EmployeeAddressSection } from "@/features/admin/User/InfoModels/Details/Pages/EmployeeDetail/components/EmployeeAddressSection";
import { EmployeeIdentitySection } from "@/features/admin/User/InfoModels/Details/Pages/EmployeeDetail/components/EmployeeIdentitySection";
import { EmployeeDocumentsSection } from "@/features/admin/User/InfoModels/Details/Pages/EmployeeDetail/components/EmployeeDocumentsSection";
import styles from "@/features/admin/User/InfoModels/Details/Pages/EmployeeDetail/components/EmployeeBasicInfo.module.css";
import sectionStyles from "@/features/admin/User/InfoModels/Details/Pages/EmployeeDetail/components/SectionCard.module.css";

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
