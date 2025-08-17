import { useState } from "react";
import styles from "../Academic.module.css";
import NavBar from "../../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

const GradeCard = () => {
  const [grade, setGrade] = useState({
    gradeName: "",
    programId: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setGrade({ ...grade, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard/academic/grade/grade-data", {
      state: { data: grade },
    });
  };

  return (
    <>
      <NavBar />
      <div className={styles.centeredCard}>
        <h2>Grade</h2>
        <form onSubmit={handleSubmit}>
          <label>Grade Name</label>
          <input
            name="gradeName"
            placeholder="e.g. Grade 11"
            value={grade.gradeName}
            onChange={handleChange}
            required
          />
          <label>Program ID</label>
          <input
            name="programId"
            placeholder="e.g. 1"
            value={grade.programId}
            onChange={handleChange}
            required
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default GradeCard;
