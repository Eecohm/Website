import React from "react";
import { CreditCard } from "lucide-react";
import sectionStyles from "@/features/admin/User/InfoModels/Details/Pages/OwnerDetail/components/SectionCard.module.css";
import detailListStyles from "@/features/admin/User/InfoModels/Details/Pages/OwnerDetail/components/DetailsListShared.module.css";

export const OwnerIdentitySection = ({ owner }) => (
  <div className={sectionStyles.sectionCard}>
    <div className={sectionStyles.sectionHeader}>
      <CreditCard size={24} className={sectionStyles.sectionIcon} />
      <h3 className={sectionStyles.sectionTitle}>Identity Documents</h3>
    </div>
    <div className={detailListStyles.detailsList}>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>Nagarikta No.</span>
        <span className={detailListStyles.detailValue}>
          {owner.nagariktaNo || "N/A"}
        </span>
      </div>
      <div className={detailListStyles.detailItem}>
        <span className={detailListStyles.detailLabel}>PAN No.</span>
        <span className={detailListStyles.detailValue}>
          {owner.panNo || "N/A"}
        </span>
      </div>
    </div>
  </div>
);
