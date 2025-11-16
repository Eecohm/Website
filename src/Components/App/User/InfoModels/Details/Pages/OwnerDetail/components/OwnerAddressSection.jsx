import React from "react";
import { MapPin } from "lucide-react";
import sectionStyles from "./SectionCard.module.css";
import detailListStyles from "./DetailsListShared.module.css";

export const OwnerAddressSection = ({ owner }) => (
  <div className={sectionStyles.sectionCard}>
    <div className={sectionStyles.sectionHeader}>
      <MapPin size={24} className={sectionStyles.sectionIcon} />
      <h3 className={sectionStyles.sectionTitle}>Address</h3>
    </div>
    <div className={detailListStyles.detailsList}>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Country</span>
        <span className={detailListStyles.detailValue}>
          {owner.country || "N/A"}
        </span>
      </div>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Province</span>
        <span className={detailListStyles.detailValue}>
          {owner.province || "N/A"}
        </span>
      </div>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Municipality</span>
        <span className={detailListStyles.detailValue}>
          {owner.municipality || "N/A"}
        </span>
      </div>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Ward / Tole</span>
        <span className={detailListStyles.detailValue}>
          {owner.ward}, {owner.tole}
        </span>
      </div>
      {owner.pinPoint && (
        <div className={detailListStyles.detailItem}>
          <span className={detailListStyles.detailLabel}>Location</span>
          <a
            href={owner.pinPoint}
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
