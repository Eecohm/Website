import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../../public/vite.svg'
const Navbar = () => {
  return (
    <nav className='container'>
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