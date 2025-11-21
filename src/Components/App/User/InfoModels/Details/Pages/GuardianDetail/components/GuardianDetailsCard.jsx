import React from "react";
import { GuardianBasicInfo } from "@/Components/App/User/InfoModels/Details/Pages/GuardianDetail/components/GuardianBasicInfo";
import { GuardianContactSection } from "@/Components/App/User/InfoModels/Details/Pages/GuardianDetail/components/GuardianContactSection";
import { GuardianAddressSection } from "@/Components/App/User/InfoModels/Details/Pages/GuardianDetail/components/GuardianAddressSection";
import { GuardianIdentitySection } from "@/Components/App/User/InfoModels/Details/Pages/GuardianDetail/components/GuardianIdentitySection";
import { GuardianDocumentsSection } from "@/Components/App/User/InfoModels/Details/Pages/GuardianDetail/components/GuardianDocumentsSection";
import styles from "@/Components/App/User/InfoModels/Details/Pages/GuardianDetail/components/GuardianBasicInfo.module.css";
import sectionStyles from "@/Components/App/User/InfoModels/Details/Pages/GuardianDetail/components/SectionCard.module.css";

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
