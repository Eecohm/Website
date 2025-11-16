import React from "react";
import { EmployeeBasicInfo } from "./EmployeeBasicInfo";
import { EmployeeContactSection } from "./EmployeeContactSection";
import { EmployeeAddressSection } from "./EmployeeAddressSection";
import { EmployeeIdentitySection } from "./EmployeeIdentitySection";
import { EmployeeDocumentsSection } from "./EmployeeDocumentsSection";
import styles from "./EmployeeBasicInfo.module.css";
import sectionStyles from "./SectionCard.module.css";

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
