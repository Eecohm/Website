import React from "react";
import styles from "@/features/admin/User/InfoModels/Forms/Components/FormComponents/FormSection/FormSection.module.css";

const FormSection = ({ title, icon: Icon, children }) => (
  <div className={styles.section}>
    <div className={styles.header}>
      <div className={styles.iconWrapper}>
        <Icon size={18} className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
    </div>
    <div className={styles.grid}>{children}</div>
  </div>
);

export default FormSection;
