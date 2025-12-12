import React from "react";
import styles from "@/features/admin/NavBar/NavBar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavItem = ({ item, active, onClick }) => {
  return (
    <li
      className={`${styles.navBarItem} ${active ? styles.active : ""}`}
      onClick={() => onClick(item.path)}
    >
      {item.icon && (
        <FontAwesomeIcon icon={item.icon} className={styles.navBarIcon} />
      )}
      <span>{item.name}</span>
    </li>
  );
};

export default NavItem;
