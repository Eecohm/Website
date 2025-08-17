import { useState } from "react";
import styles from "../Academic.module.css";
import NavBar from "../../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

const FacultyCard = () => {
  const [faculty, setFaculty] = useState({
    facultyName: "",
    programId: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFaculty({ ...faculty, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard/academic/faculty/faculty-data", {
      state: { data: faculty },
    });
  };

  return (
    <>
      <NavBar />
      <div className={styles.centeredCard}>
        <h2>Faculty</h2>
        <form onSubmit={handleSubmit}>
          <label>Faculty Name</label>
          <input
            name="facultyName"
            placeholder="e.g. Hospitality"
            value={faculty.facultyName}
            onChange={handleChange}
            required
          />
          <label>Program ID</label>
          <input
            name="programId"
            placeholder="e.g. 1"
            value={faculty.programId}
            onChange={handleChange}
            required
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default FacultyCard;
