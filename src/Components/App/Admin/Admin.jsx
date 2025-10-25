import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import NavBar from "../NavBar/NavBar";
import UserManagement from "./UserManagement/UserManagement";

const Admin = () => {
  const navigate = useNavigate();

  const [activeView, setActiveView] = useState("dashboard");

  const handleUserCardClick = () => {
    setActiveView("userManagement");
  };

  const handleBackToDashboard = () => {
    setActiveView("dashboard");
  };

  useEffect(() => {
    navigate("/dashboard/admin", { replace: true });
  }, [navigate]);

  const academicCards = [
    {
      title: "User",
      path: "/dashboard/academic/academic-year",
      icon: "📝", // form / approval
      description: "Manage Student and Staff Sign up forms for approvals",
    },
    {
      title: "Result",
      path: "/dashboard/academic/program",
      icon: "📊", // results / report
      description: "Configure educational programs and courses",
    },
    {
      title: "Exams",
      path: "/dashboard/academic/faculty",
      icon: "✏️", // exam / writing
      description: "Manage faculty members and departments",
    },
    {
      title: "Certificates",
      path: "/dashboard/academic/grade",
      icon: "🎓", // certificate / graduation
      description: "Handle grading systems and assessments",
    },
    {
      title: "Routine",
      path: "/dashboard/academic/academic-class",
      icon: "📅", // schedule / routine
      description: "Organize and manage class structures",
    },
    {
      title: "Transport",
      path: "/dashboard/academic/academic-class",
      icon: "🚌", // transport / bus
      description: "Manage transport facilities and routes",
    },
  ];

  return (
    <>
      <NavBar />

      {activeView === "dashboard" && (
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Admin Management</h1>
            <p className={styles.subtitle}>
              Manage all Admin-related operations and configurations
            </p>
          </div>

          <div className={styles.cardGrid}>
            {academicCards.map((card, index) => {
              if (card.title === "User") {
                return (
                  <div
                    key={index}
                    className={styles.card}
                    onClick={handleUserCardClick}
                    style={{ cursor: "pointer" }}
                  >
                    <div className={styles.cardIcon}>{card.icon}</div>
                    <div className={styles.cardContent}>
                      <h2 className={styles.cardTitle}>{card.title}</h2>
                      <p className={styles.cardDescription}>
                        {card.description}
                      </p>
                    </div>
                    <div className={styles.cardArrow}>→</div>
                  </div>
                );
              }

              return (
                <Link key={index} to={card.path} className={styles.card}>
                  <div className={styles.cardIcon}>{card.icon}</div>
                  <div className={styles.cardContent}>
                    <h2 className={styles.cardTitle}>{card.title}</h2>
                    <p className={styles.cardDescription}>{card.description}</p>
                  </div>
                  <div className={styles.cardArrow}>→</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      {/* User Management View */}
      {activeView === "userManagement" && (
        <UserManagement onBack={handleBackToDashboard} />
      )}
    </>
  );
};

export default Admin;
