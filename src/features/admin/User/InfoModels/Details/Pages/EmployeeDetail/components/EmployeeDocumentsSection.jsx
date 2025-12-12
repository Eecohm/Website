import React from "react";
import { FileText, CreditCard, Download } from "lucide-react";
import sectionStyles from "./SectionCard.module.css";
import styles from "./EmployeeDocumentsSection.module.css";

export const EmployeeDocumentsSection = ({ employee, onViewDocument }) => (
  <div className={`${sectionStyles.sectionCard} ${styles.documentsSection}`}>
    <div className={sectionStyles.sectionHeader}>
      <FileText size={24} className={sectionStyles.sectionIcon} />
      <h3 className={sectionStyles.sectionTitle}>Documents</h3>
    </div>
    <div className={styles.documentsGrid}>
      {employee.nagariktaPhoto && (
        <div className={styles.documentCard}>
          <CreditCard size={30} className={styles.documentIcon} />
          <div className={styles.documentName}>Nagarikta Photo</div>
          <button
            onClick={() => onViewDocument(employee.nagariktaPhoto)}
            className={styles.documentButton}
          >
            <Download size={16} />
            View
          </button>
        </div>
      )}
      {employee.panPhoto && (
        <div className={styles.documentCard}>
          <FileText size={30} className={styles.documentIcon} />
          <div className={styles.documentName}>PAN Photo</div>
          <button
            onClick={() => onViewDocument(employee.panPhoto)}
            className={styles.documentButton}
          >
            <Download size={16} />
            View
          </button>
        </div>
      )}
      {employee.academicQualification && (
        <div className={styles.documentCard}>
          <FileText size={30} className={styles.documentIcon} />
          <div className={styles.documentName}>Academic Qualification</div>
          <button
            onClick={() => onViewDocument(employee.academicQualification)}
            className={styles.documentButton}
          >
            <Download size={16} />
            View
          </button>
        </div>
      )}
      {employee.resumeCv && (
        <div className={styles.documentCard}>
          <FileText size={30} className={styles.documentIcon} />
          <div className={styles.documentName}>Resume/CV</div>
          <button
            onClick={() => onViewDocument(employee.resumeCv)}
            className={styles.documentButton}
          >
            <Download size={16} />
            View
          </button>
        </div>
      )}
      {employee.jobApplication && (
        <div className={styles.documentCard}>
          <FileText size={30} className={styles.documentIcon} />
          <div className={styles.documentName}>Job Application</div>
          <button
            onClick={() => onViewDocument(employee.jobApplication)}
            className={styles.documentButton}
          >
            <Download size={16} />
            View
          </button>
        </div>
      )}
      {employee.hiringLetter && (
        <div className={styles.documentCard}>
          <FileText size={30} className={styles.documentIcon} />
          <div className={styles.documentName}>Hiring Letter</div>
          <button
            onClick={() => onViewDocument(employee.hiringLetter)}
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
