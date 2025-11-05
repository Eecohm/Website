import React from "react";
import logoSrc from "../../../../assets/logo.svg";
import styles from "../NavBar.module.css";

const Logo = ({ className, onClick, alt = "School Logo" }) => (
  <img
    src={logoSrc}
    alt={alt}
    className={className || styles.topBarLogo}
    onClick={onClick}
  />
);

export default Logo;
