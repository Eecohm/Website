import React from "react";
import styles from "../NavBar.module.css";
import Logo from "./Logo";
import NavItem from "./NavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = ({
  isSidebarOpen,
  navItems = [],
  handleNavItemClick,
  handleLogoClick,
  location,
}) => {
  return (
    <nav className={`${styles.navBar} ${isSidebarOpen ? styles.open : ""}`}>
      <div className={styles.navBarHeader}>
        <Logo className={styles.navBarLogo} onClick={handleLogoClick} />
      </div>
      <ul className={styles.navBarMenu}>
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            item={item}
            active={location && location.pathname === item.path}
            onClick={handleNavItemClick}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
