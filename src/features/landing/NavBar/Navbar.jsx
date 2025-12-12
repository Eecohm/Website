import React, { useState, useEffect } from "react";
import styles from "@/features/landing/NavBar/Navbar.module.css";
import logo from "@/assets/logo.svg";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBlur, setShowBlur] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");

    const handleBlurScroll = () => {
      if (window.innerWidth < 1024) {
        setShowBlur(false);
        return;
      }
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      // If scrolled within hero section but not at top
      const isInHero = rect.top < 0 && rect.bottom > 0;
      setShowBlur(isInHero);
    };

    // Call immediately on mount
    handleBlurScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleBlurScroll, { passive: true });
    window.addEventListener("resize", handleBlurScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleBlurScroll);
      window.removeEventListener("resize", handleBlurScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleHamburgerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMobileMenu();
  };

  const handleHamburgerTouch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMobileMenu();
  };

  const closeMobileMenu = (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleCloseButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`container ${styles.nav} ${
        isScrolled ? styles.navScrolled : ""
      } ${showBlur ? styles["navbarBlurBg"] : ""}`}
    >
      <Link to="/" onClick={handleLinkClick}>
        <img src={logo} alt="Logo" className={styles.logoName} />
      </Link>

      {/* Hamburger button */}
      <button
        className={styles.hamburgerIcon}
        onClick={handleHamburgerClick}
        onTouchEnd={handleHamburgerTouch}
        type="button"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
      >
        <FaBars size={25} />
      </button>

      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div
          className={styles.backdrop}
          onClick={handleLinkClick}
          onTouchEnd={handleLinkClick}
          role="presentation"
        />
      )}

      {/* Mobile menu */}
      <ul
        className={`${styles.navMenu} ${
          isMobileMenuOpen ? styles.navMenuActive : ""
        }`}
      >
        <li>
          <Link to="/#hero" className={styles.Link} onClick={handleLinkClick}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="#programs"
            onClick={handleLinkClick}
            className={styles.Link}
          >
            Program
          </Link>
        </li>
        <li>
          <Link to="#school" onClick={handleLinkClick} className={styles.Link}>
            School
          </Link>
        </li>
        <li>
          <Link
            to="#about-us"
            onClick={handleLinkClick}
            className={styles.Link}
          >
            {" "}
            About
          </Link>
        </li>
        <li>
          <Link
            to="#testimonials"
            onClick={handleLinkClick}
            className={styles.Link}
          >
            Testimonials
          </Link>
        </li>
        <li>
          <Link to="#contact-us" onClick={handleLinkClick}>
            <button className={styles.navBtn}>Contact</button>
          </Link>
        </li>
      </ul>

      {/* Close button - separate from menu */}
      {isMobileMenuOpen && (
        <button
          className={styles.closeBtn}
          onClick={handleCloseButtonClick}
          onTouchStart={(e) => e.preventDefault()}
          onTouchEnd={handleCloseButtonClick}
          type="button"
          aria-label="Close menu"
        >
          ✕
        </button>
      )}
    </nav>
  );
};

export default Navbar;
