import { useState } from "react";
import styles from "../Academic.module.css";
import NavBar from "../../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

const AcademicClassCard = () => {
  const [academicClass, setAcademicClass] = useState({
    academicYearId: "",
    gradeId: "",
    facultyId: "",
    section: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setAcademicClass({ ...academicClass, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard/academic/academic-class/academic-data", {
      state: { data: "academic-class" },
    });
  };

  return (
    <>
      <NavBar />

      <div className={styles.centeredCard}>
        <h2>Academic Class</h2>
        <form onSubmit={handleSubmit}>
          <label>Academic Year ID</label>
          <input
            name="academicYearId"
            placeholder="e.g. 1"
            value={academicClass.academicYearId}
            onChange={handleChange}
            required
          />
          <label>Grade ID</label>
          <input
            name="gradeId"
            placeholder="e.g. 1"
            value={academicClass.gradeId}
            onChange={handleChange}
            required
          />
          <label>Faculty ID</label>
          <input
            name="facultyId"
            placeholder="e.g. 1"
            value={academicClass.facultyId}
            onChange={handleChange}
            required
          />
          <label>Section</label>
          <input
            name="section"
            placeholder="e.g. A"
            value={academicClass.section}
            onChange={handleChange}
            required
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default AcademicClassCard;
