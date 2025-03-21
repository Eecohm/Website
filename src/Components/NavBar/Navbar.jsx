import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/vite.svg'
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
  };
   window.addEventListener('scroll', handleScroll);
   return () => {
    window.removeEventListener('scroll', handleScroll);
   };
  }, []);

  return (
    <nav className={`container ${isScrolled ? 'scrolled' : ''}`}>
     <img src={logo} alt="" className='logo'/>
     <ul>
      <li>Home</li>
      <li>Program</li>
      <li>About Us</li>
      <li>College</li>
      <li>Testimonials</li>
      <li><button className='btn'> Contact us </button></li>
     </ul>
    </nav>
  );
};

export default Navbar;