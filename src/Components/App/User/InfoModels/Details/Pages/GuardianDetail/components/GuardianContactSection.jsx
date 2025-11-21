import React from "react";
import { Phone } from "lucide-react";
import sectionStyles from "@/Components/App/User/InfoModels/Details/Pages/GuardianDetail/components/SectionCard.module.css";
import detailListStyles from "@/Components/App/User/InfoModels/Details/Pages/GuardianDetail/components/DetailsListShared.module.css";

export const GuardianContactSection = ({ guardian }) => (
  <div className={sectionStyles.sectionCard}>
    <div className={sectionStyles.sectionHeader}>
      <Phone size={24} className={sectionStyles.sectionIcon} />
      <h3 className={sectionStyles.sectionTitle}>Contact Information</h3>
    </div>
    <div className={detailListStyles.detailsList}>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Phone</span>
        <span className={detailListStyles.detailValue}>
          {guardian.phone || "N/A"}
        </span>
      </div>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Alternate Phone</span>
        <span className={detailListStyles.detailValue}>
          {guardian.alternatePhone || "N/A"}
        </span>
      </div>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Tell Phone</span>
        <span className={detailListStyles.detailValue}>
          {guardian.tellPhone || "N/A"}
        </span>
      </div>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Contact Person</span>
        <span className={detailListStyles.detailValue}>
          {guardian.contactPerson || "N/A"}
        </span>
      </div>
    </div>
  </div>
);
