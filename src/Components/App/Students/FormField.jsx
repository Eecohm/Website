import styles from "@/Components/App/Students/Students.module.css";

const FormField = ({ label, name, value, onChange, error, type = "text" }) => (
  <div className={styles.fieldGroup}>
    <label>{label}</label>
    {type === "label" ? (
      <label
        name={name}
        value={value}
        onChange={onChange}
        className={error ? styles.inputError : ""}
        rows={3}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? styles.inputError : ""}
      />
    )}
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

export default FormField;
