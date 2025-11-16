import React from "react";
import { MapPin } from "lucide-react";
import sectionStyles from "./SectionCard.module.css";
import detailListStyles from "./DetailsListShared.module.css";

export const EmployeeAddressSection = ({ employee }) => (
  <div className={sectionStyles.sectionCard}>
    <div className={sectionStyles.sectionHeader}>
      <MapPin size={24} className={sectionStyles.sectionIcon} />
      <h3 className={sectionStyles.sectionTitle}>Address Information</h3>
    </div>
    <div className={detailListStyles.detailsList}>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Country</span>
        <span className={detailListStyles.detailValue}>
          {employee.country || "N/A"}
        </span>
      </div>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Province</span>
        <span className={detailListStyles.detailValue}>
          {employee.province || "N/A"}
        </span>
      </div>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Municipality</span>
        <span className={detailListStyles.detailValue}>
          {employee.municipality || "N/A"}
        </span>
      </div>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Ward</span>
        <span className={detailListStyles.detailValue}>
          {employee.ward || "N/A"}
        </span>
      </div>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Tole</span>
        <span className={detailListStyles.detailValue}>
          {employee.tole || "N/A"}
        </span>
      </div>
    </div>
  </div>
);
