import React from "react";
import { Phone } from "lucide-react";
import sectionStyles from "./SectionCard.module.css";
import detailListStyles from "./DetailsListShared.module.css";

export const EmployeeContactSection = ({ employee }) => (
  <div className={sectionStyles.sectionCard}>
    <div className={sectionStyles.sectionHeader}>
      <Phone size={24} className={sectionStyles.sectionIcon} />
      <h3 className={sectionStyles.sectionTitle}>Contact Information</h3>
    </div>
    <div className={detailListStyles.detailsList}>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Phone</span>
        <span className={detailListStyles.detailValue}>
          {employee.phone || "N/A"}
        </span>
      </div>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Alternate Phone</span>
        <span className={detailListStyles.detailValue}>
          {employee.alternatePhone || "N/A"}
        </span>
      </div>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Email</span>
        <span className={detailListStyles.detailValue}>
          {employee.email || "N/A"}
        </span>
      </div>
    </div>
  </div>
);
