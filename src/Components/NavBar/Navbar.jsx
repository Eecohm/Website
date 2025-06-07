import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.svg';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`container ${isScrolled ? styles.navScrolled : ''}`}>
      <Link to="/" onClick={closeMobileMenu}>
        <img src={logo} alt="Logo" className={styles.logoName} />
      </Link>
      
      {/* Hamburger button */}
      <div className={styles.hamburgerIcon} onClick={toggleMobileMenu}>
        <FaBars size={25} />
      </div>

      {/* Mobile menu */}
      <ul className={`${styles.navMenu} ${isMobileMenuOpen ? styles.navMenuActive : ''}`}>
        <li>
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
        </li>
        <li>
          <Link to="#programs" onClick={closeMobileMenu}>Program</Link>
        </li>
        <li>
          <Link to="#school" onClick={closeMobileMenu}>School</Link>
        </li>
        <li>
          <Link to="#about-us" onClick={closeMobileMenu}>About</Link>
        </li>
        <li>
          <Link to="#testimonials" onClick={closeMobileMenu}>Testimonials</Link>
        </li>
        <li>
          <Link to="#contact-us" onClick={closeMobileMenu}>
            <button className={styles.navBtn}>Contact</button>
          </Link>
        </li>
      </ul>

      {/* Close button - separate from menu */}
      {isMobileMenuOpen && (
        <button className={styles.closeBtn} onClick={toggleMobileMenu}>
          X
        </button>
      )}
    </nav>
  );
};

export default Navbar;