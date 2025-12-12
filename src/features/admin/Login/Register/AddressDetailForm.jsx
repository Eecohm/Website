import React from "react";
import styles from "@/features/admin/Login/Register/Register.module.css";

const AddressDetailForm = ({ formData, setFormData }) => (
  <div className={styles.formSection}>
    <h3>Address Details</h3>
    <div className={styles.formGrid}>
      <div>
        <label>Country *</label>
        <input
          type="text"
          value={formData.country || ""}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label>Province *</label>
        <input
          type="text"
          value={formData.province || ""}
          onChange={(e) =>
            setFormData({ ...formData, province: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label>Municipality *</label>
        <input
          type="text"
          value={formData.municipality || ""}
          onChange={(e) =>
            setFormData({ ...formData, municipality: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label>Ward *</label>
        <input
          type="text"
          value={formData.ward || ""}
          onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Tole *</label>
        <input
          type="text"
          value={formData.tole || ""}
          onChange={(e) => setFormData({ ...formData, tole: e.target.value })}
          required
        />
      </div>
    </div>
  </div>
);

export default AddressDetailForm;
