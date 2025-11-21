import styles from "@/Components/App/Students/Students.module.css";

const FormSection = ({ icon: Icon, title, children }) => (
  <div className={styles.section}>
    <h2 className={styles.sectionTitle}>
      {Icon && <Icon className={styles.sectionIcon} />}
      {title}
    </h2>
    {children}
  </div>
);

export default FormSection;
