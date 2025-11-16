import React from "react";
import { GuardianBasicInfo } from "./GuardianBasicInfo";
import { GuardianContactSection } from "./GuardianContactSection";
import { GuardianAddressSection } from "./GuardianAddressSection";
import { GuardianIdentitySection } from "./GuardianIdentitySection";
import { GuardianDocumentsSection } from "./GuardianDocumentsSection";
import styles from "./GuardianBasicInfo.module.css";
import sectionStyles from "./SectionCard.module.css";

export const GuardianDetailsCard = ({
  guardian,
  getKycStatusClass,
  onViewDocument,
}) => (
  <div className={styles.idCard}>
    <GuardianBasicInfo
      guardian={guardian}
      getKycStatusClass={getKycStatusClass}
    />

    <div className={sectionStyles.sectionsGrid}>
      <GuardianContactSection guardian={guardian} />
      <GuardianAddressSection guardian={guardian} />
    </div>
  </div>
);

{
  /* not necessary : */
}
{
  /* <GuardianIdentitySection guardian={guardian} />
      <GuardianDocumentsSection
        guardian={guardian}
        onViewDocument={onViewDocument}
      /> */
}
