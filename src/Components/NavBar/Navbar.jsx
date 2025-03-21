import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/vite.svg'; // Ensure this path is correct
import { FaBars, FaTimes } from 'react-icons/fa'; // For hamburger menu
import { Link } from 'react-router-dom'; // Import Link for routing

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false); // Close menu when a link is clicked
  };

  return (
    <nav className={`container ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" onClick={closeMobileMenu}>
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <div className="hamburger" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
      </div>
      <ul className={isMobileMenuOpen ? 'nav-menu active' : 'nav-menu'}>
        <li className="close-btn-li">
          <button className="close-button" onClick={toggleMobileMenu}>
            X
          </button>
        </li>
        <li>
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
        </li>
        <li>
          <Link to="/programs" onClick={closeMobileMenu}>Program</Link>
        </li>
        <li>
          <Link to="/about-us" onClick={closeMobileMenu}>About Us</Link>
        </li>
        <li>
          <Link to="/testimonials" onClick={closeMobileMenu}>Testimonials</Link>
        </li>
        <li>
          <Link to="/contact-us" onClick={closeMobileMenu}>
            <button className="btn">Contact Us</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;