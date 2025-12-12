import React from "react";
import { MapPin } from "lucide-react";
import sectionStyles from "@/features/admin/User/InfoModels/Details/Pages/GuardianDetail/components/SectionCard.module.css";
import detailListStyles from "@/features/admin/User/InfoModels/Details/Pages/GuardianDetail/components/DetailsListShared.module.css";

export const GuardianAddressSection = ({ guardian }) => (
  <div className={sectionStyles.sectionCard}>
    <div className={sectionStyles.sectionHeader}>
      <MapPin size={24} className={sectionStyles.sectionIcon} />
      <h3 className={sectionStyles.sectionTitle}>Address</h3>
    </div>
    <div className={detailListStyles.detailsList}>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Country</span>
        <span className={detailListStyles.detailValue}>
          {guardian.country || "N/A"}
        </span>
      </div>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Province</span>
        <span className={detailListStyles.detailValue}>
          {guardian.province || "N/A"}
        </span>
      </div>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Municipality</span>
        <span className={detailListStyles.detailValue}>
          {guardian.municipality || "N/A"}
        </span>
      </div>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Ward / Tole</span>
        <span className={detailListStyles.detailValue}>
          {guardian.ward}, {guardian.tole}
        </span>
      </div>
      {guardian.pinPoint && (
        <div className={detailListStyles.detailItem}>
          <span className={detailListStyles.detailLabel}>Location</span>
          <a
            href={guardian.pinPoint}
            target="_blank"
            rel="noopener noreferrer"
            className={detailListStyles.detailLink}
          >
            View on Map
          </a>
        </div>
      )}
    </div>
  </div>
);
