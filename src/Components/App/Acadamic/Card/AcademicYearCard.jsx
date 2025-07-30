import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Acadamic.module.css";

const AcademicYearCard = ({ onSave }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    programName: "",
    durationMonths: "",
    previousProgramId: "",
    affiliatedTo: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard/academic/academic-year/academic-data", {
      state: { data: formData },
    });
  };

  return (
    <div className={styles.centeredCard}>
      <h2>Academic Year & Program</h2>
      <form onSubmit={handleSubmit}>
        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />

        <label>Program Name</label>
        <input
          type="text"
          name="programName"
          value={formData.programName}
          onChange={handleChange}
          required
        />

        <label>Duration (Months)</label>
        <input
          type="number"
          name="durationMonths"
          value={formData.durationMonths}
          onChange={handleChange}
          required
        />

        <label>Previous Program ID</label>
        <input
          type="text"
          name="previousProgramId"
          value={formData.previousProgramId}
          onChange={handleChange}
        />

        <label>Affiliated To</label>
        <input
          type="text"
          name="affiliatedTo"
          value={formData.affiliatedTo}
          onChange={handleChange}
          required
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AcademicYearCard;
