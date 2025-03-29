// Navbar.jsx
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.svg';
import { FaBars } from 'react-icons/fa'; // Only need FaBars now
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
    <nav className={`container ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" onClick={closeMobileMenu}>
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      
      {/* Hamburger button */}
      <div className="hamburger" onClick={toggleMobileMenu}>
        <FaBars size={25} />
      </div>

      {/* Mobile menu */}
      <ul className={isMobileMenuOpen ? 'nav-menu active' : 'nav-menu'}>
        <li>
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
        </li>
        <li>
          <Link to="/programs" onClick={closeMobileMenu}>Program</Link>
        </li>
        <li>
          <Link to="/school" onClick={closeMobileMenu}>School</Link>
        </li>
        <li>
          <Link to="/about-us" onClick={closeMobileMenu}>About</Link>
        </li>
        <li>
          <Link to="/testimonials" onClick={closeMobileMenu}>Testimonials</Link>
        </li>
        <li>
          <Link to="/contact-us" onClick={closeMobileMenu}>
            <button className="btn">Contact</button>
          </Link>
        </li>
      </ul>

      {/* Close button - separate from menu */}
      {isMobileMenuOpen && (
        <button className="close-btn" onClick={toggleMobileMenu}>
          X
        </button>
      )}
    </nav>
  );
};

export default Navbar;