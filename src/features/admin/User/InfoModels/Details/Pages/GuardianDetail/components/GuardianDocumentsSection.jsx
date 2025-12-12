import React from "react";
import { FileText, CreditCard, Download } from "lucide-react";
import sectionStyles from "@/features/admin/User/InfoModels/Details/Pages/GuardianDetail/components/SectionCard.module.css";
import styles from "@/features/admin/User/InfoModels/Details/Pages/GuardianDetail/components/GuardianDocumentsSection.module.css";

export const GuardianDocumentsSection = ({ guardian, onViewDocument }) => (
  <div className={sectionStyles.sectionCard}>
    <div className={sectionStyles.sectionHeader}>
      <FileText size={24} className={sectionStyles.sectionIcon} />
      <h3 className={sectionStyles.sectionTitle}>Documents</h3>
    </div>
    <div className={styles.documentsGrid}>
      {guardian.nagariktaPhoto && (
        <div className={styles.documentCard}>
          <CreditCard size={40} className={styles.documentIcon} />
          <div className={styles.documentName}>Nagarikta Photo</div>
          <button
            onClick={() => onViewDocument(guardian.nagariktaPhoto)}
            className={styles.documentButton}
          >
            <Download size={16} />
            View
          </button>
        </div>
      )}
      {guardian.panPhoto && (
        <div className={styles.documentCard}>
          <FileText size={40} className={styles.documentIcon} />
          <div className={styles.documentName}>PAN Photo</div>
          <button
            onClick={() => onViewDocument(guardian.panPhoto)}
            className={styles.documentButton}
          >
            <Download size={16} />
            View
          </button>
        </div>
      )}
    </div>
  </div>
);
