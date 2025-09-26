import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Tasks.module.css";
import NavBar from "../NavBar/NavBar";

const Tasks = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard/tasks", { replace: true });
  }, [navigate]);

  const tasksCards = [
    {
      title: "My Tasks",
      path: "/dashboard/tasks/my-tasks",
      icon: "📝", // personal task list
      description: "View and manage tasks assigned to you",
    },
    {
      title: "Team Tasks",
      path: "/dashboard/tasks/team-tasks",
      icon: "👥", // team collaboration
      description: "Collaborate and track team-wide tasks",
    },
    {
      title: "Deadlines",
      path: "/dashboard/tasks/deadlines",
      icon: "⏰", // due dates
      description: "Track upcoming deadlines and priorities",
    },
    {
      title: "Progress",
      path: "/dashboard/tasks/progress",
      icon: "📊", // progress chart
      description: "Monitor progress and task completion status",
    },
    {
      title: "Completed",
      path: "/dashboard/tasks/completed",
      icon: "✅", // done
      description: "Review completed and archived tasks",
    },
    {
      title: "Reports",
      path: "/dashboard/tasks/reports",
      icon: "📑", // reporting
      description: "Generate productivity and task performance reports",
    }
  ];

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Tasks Management</h1>
          <p className={styles.subtitle}>
            Organize, assign, and track all tasks and deadlines
          </p>
        </div>

        <div className={styles.cardGrid}>
          {tasksCards.map((card, index) => (
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

export default Tasks;
