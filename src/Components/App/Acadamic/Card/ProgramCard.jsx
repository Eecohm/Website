import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Acadamic.module.css";
import NavBar from "../../NavBar/NavBar";

const ProgramCard = () => {
  const [program, setProgram] = useState({
    programName: "",
    durationMonths: "",
    previousProgramId: "",
    affiliatedTo: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProgram({ ...program, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard/academic/program/program-data", {
      state: { program },
    });
  };

  return (
    <>
      <NavBar />
      <div className={styles.centeredCard}>
        <h2>Program</h2>
        <form onSubmit={handleSubmit}>
          <label>Program Name</label>
          <input
            type="text"
            name="programName"
            placeholder="e.g., BHM"
            value={program.programName}
            onChange={handleChange}
            required
          />

          <label>Duration (in months)</label>
          <input
            type="number"
            name="durationMonths"
            placeholder="e.g., 36"
            value={program.durationMonths}
            onChange={handleChange}
            required
          />

          <label>Previous Program ID</label>
          <input
            type="text"
            name="previousProgramId"
            placeholder="Optional"
            value={program.previousProgramId}
            onChange={handleChange}
          />

          <label>Affiliated To</label>
          <input
            type="text"
            name="affiliatedTo"
            placeholder="e.g., TU"
            value={program.affiliatedTo}
            onChange={handleChange}
            required
          />

          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default ProgramCard;
