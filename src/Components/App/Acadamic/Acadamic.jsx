import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Acadamic.module.css";
import NavBar from "../NavBar/NavBar";

const Acadamic = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard/academic", { replace: true });
  }, [navigate]);

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <h1 className={styles.title}>Academic Management</h1>
        <div className={styles.cardGrid}>
          <Link to="/dashboard/academic/academic-year" className={styles.card}>
            <h2>Academic Year</h2>
          </Link>
          <Link to="/dashboard/academic/program" className={styles.card}>
            <h2>Program</h2>
          </Link>
          <Link to="/dashboard/academic/faculty" className={styles.card}>
            <h2>Faculty</h2>
          </Link>
          <Link to="/dashboard/academic/grade" className={styles.card}>
            <h2>Grade</h2>
          </Link>
          <Link to="/dashboard/academic/academic-class" className={styles.card}>
            <h2>Academic Class</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Acadamic;
