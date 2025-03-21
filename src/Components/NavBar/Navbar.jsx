import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/vite.svg'; // Ensure this path is correct
import { FaBars, FaTimes } from 'react-icons/fa'; // For hamburger menu

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

  return (
    <nav className={`container ${isScrolled ? 'scrolled' : ''}`}>
      <img src={logo} alt="Logo" className="logo" />
      <div className="hamburger" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
      </div>
      <ul className={isMobileMenuOpen ? 'nav-menu active' : 'nav-menu'}>
        <li>Home</li>
        <li>Program</li>
        <li>School</li>
        <li>About Us</li>
        <li>Testimonials</li>
        <li>
          <button className="btn">Contact Us</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;