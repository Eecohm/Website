import React from "react";
import styles from "@/Components/App/NavBar/NavBar.module.css";

const NavSection = ({ title, children }) => {
  return (
    <div className={styles.navSection}>
      {title && <div className={styles.navSectionTitle}>{title}</div>}
      <ul className={styles.navSectionList}>{children}</ul>
    </div>
  );
};

export default NavSection;
