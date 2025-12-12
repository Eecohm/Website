import React from "react";
import { FileText, CreditCard, Download } from "lucide-react";
import sectionStyles from "@/features/admin/User/InfoModels/Details/Pages/OwnerDetail/components/SectionCard.module.css";
import styles from "@/features/admin/User/InfoModels/Details/Pages/OwnerDetail/components/OwnerDocumentsSection.module.css";

export const OwnerDocumentsSection = ({ owner, onViewDocument }) => (
  <div className={sectionStyles.sectionCard}>
    <div className={sectionStyles.sectionHeader}>
      <FileText size={24} className={sectionStyles.sectionIcon} />
      <h3 className={sectionStyles.sectionTitle}>Documents</h3>
    </div>
    <div className={styles.documentsGrid}>
      {owner.nagariktaPhoto && (
        <div className={styles.documentCard}>
          <CreditCard size={40} className={styles.documentIcon} />
          <div className={styles.documentName}>Nagarikta Photo</div>
          <button
            onClick={() => onViewDocument(owner.nagariktaPhoto)}
            className={styles.documentButton}
          >
            <Download size={16} />
            View
          </button>
        </div>
      )}
      {owner.panPhoto && (
        <div className={styles.documentCard}>
          <FileText size={40} className={styles.documentIcon} />
          <div className={styles.documentName}>PAN Photo</div>
          <button
            onClick={() => onViewDocument(owner.panPhoto)}
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
