import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "@/features/admin/Teachers/Teachers.module.css";
import NavBar from "@/features/admin/NavBar/NavBar";

const Teachers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard/teachers", { replace: true });
  }, [navigate]);

  const teacherCards = [
    {
      title: "Profiles",
      path: "/dashboard/teachers/profiles",
      icon: "👩‍🏫", // teacher / profile
      description: "Manage teacher personal and professional details",
    },
    {
      title: "Attendance",
      path: "/dashboard/teachers/attendance",
      icon: "🗓️", // calendar
      description: "Track teacher attendance and leave records",
    },
    {
      title: "Schedule",
      path: "/dashboard/teachers/schedule",
      icon: "📅", // timetable
      description: "Assign and manage teacher class schedules",
    },
    {
      title: "Subjects",
      path: "/dashboard/teachers/subjects",
      icon: "📘", // book / subject
      description: "Allocate subjects and teaching responsibilities",
    },
    {
      title: "Performance",
      path: "/dashboard/teachers/performance",
      icon: "⭐", // performance / rating
      description: "Monitor teacher performance and feedback",
    },
    {
      title: "Reports",
      path: "/dashboard/teachers/reports",
      icon: "📊", // reporting
      description: "Generate reports on teacher activities and workload",
    },
  ];

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Teachers Management</h1>
          <p className={styles.subtitle}>
            Manage teacher profiles, schedules, and performance
          </p>
        </div>

        <div className={styles.cardGrid}>
          {teacherCards.map((card, index) => (
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

export default Teachers;
