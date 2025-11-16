import { Link } from "react-router-dom";
import styles from "./Admin.module.css";
import NavBar from "../NavBar/NavBar";
import { academicCards } from "./adminCardData";

const Admin = () => {
  return (
    <>
      <NavBar />

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
                <Link key={index} to="users" className={styles.card}>
                  <div className={styles.cardIcon}>{card.icon}</div>
                  <div className={styles.cardContent}>
                    <h2 className={styles.cardTitle}>{card.title}</h2>
                    <p className={styles.cardDescription}>{card.description}</p>
                  </div>
                  <div className={styles.cardArrow}>→</div>
                </Link>
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
    </>
  );
};

export default Admin;
