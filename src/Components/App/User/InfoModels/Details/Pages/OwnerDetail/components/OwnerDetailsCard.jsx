import React from "react";
import { OwnerBasicInfo } from "@/Components/App/User/InfoModels/Details/Pages/OwnerDetail/components/OwnerBasicInfo";
import { OwnerContactSection } from "@/Components/App/User/InfoModels/Details/Pages/OwnerDetail/components/OwnerContactSection";
import { OwnerAddressSection } from "@/Components/App/User/InfoModels/Details/Pages/OwnerDetail/components/OwnerAddressSection";
import { OwnerIdentitySection } from "@/Components/App/User/InfoModels/Details/Pages/OwnerDetail/components/OwnerIdentitySection";
import { OwnerDocumentsSection } from "@/Components/App/User/InfoModels/Details/Pages/OwnerDetail/components/OwnerDocumentsSection";
import styles from "@/Components/App/User/InfoModels/Details/Pages/OwnerDetail/components/OwnerBasicInfo.module.css";
import sectionStyles from "@/Components/App/User/InfoModels/Details/Pages/OwnerDetail/components/SectionCard.module.css";

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
