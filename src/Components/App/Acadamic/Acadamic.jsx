import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Academic.module.css";
import NavBar from "../NavBar/NavBar";

const Academic = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard/academic", { replace: true });
  }, [navigate]);

  const academicCards = [
    {
      title: "Academic Year",
      path: "/dashboard/academic/academic-year",
      icon: "📅",
      description: "Manage academic year periods and sessions",
    },
    {
      title: "Program",
      path: "/dashboard/academic/program",
      icon: "🎓",
      description: "Configure educational programs and courses",
    },
    {
      title: "Faculty",
      path: "/dashboard/academic/faculty",
      icon: "📚 ",
      description: "Manage faculty members and departments",
    },
    {
      title: "Grade",
      path: "/dashboard/academic/grade",
      icon: "📊",
      description: "Handle grading systems and assessments",
    },
    {
      title: "Academic Class",
      path: "/dashboard/academic/academic-class",
      icon: "🏫",
      description: "Organize and manage class structures",
    },
  ];

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Academic Management</h1>
          <p className={styles.subtitle}>
            Manage all academic-related operations and configurations
          </p>
        </div>

        <div className={styles.cardGrid}>
          {academicCards.map((card, index) => (
            <Link key={index} to={card.path} className={styles.card}>
              <div className={styles.cardIcon}>{card.icon}</div>
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{card.title}</h2>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
              <div className={styles.cardArrow}>→</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Academic;
