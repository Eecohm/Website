import React from "react";
import { OwnerBasicInfo } from "./OwnerBasicInfo";
import { OwnerContactSection } from "./OwnerContactSection";
import { OwnerAddressSection } from "./OwnerAddressSection";
import { OwnerIdentitySection } from "./OwnerIdentitySection";
import { OwnerDocumentsSection } from "./OwnerDocumentsSection";
import styles from "./OwnerBasicInfo.module.css";
import sectionStyles from "./SectionCard.module.css";

export const OwnerDetailsCard = ({
  owner,
  getKycStatusClass,
  onViewDocument,
}) => (
  <div className={styles.idCard}>
    <OwnerBasicInfo owner={owner} getKycStatusClass={getKycStatusClass} />

    <div className={sectionStyles.sectionsGrid}>
      <OwnerContactSection owner={owner} />
      <OwnerAddressSection owner={owner} />
      <OwnerIdentitySection owner={owner} />
      <OwnerDocumentsSection owner={owner} onViewDocument={onViewDocument} />
    </div>
  </div>
);
