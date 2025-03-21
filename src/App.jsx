import React from 'react';
import Navbar from './Components/NavBar/Navbar';
import Hero from './Components/Hero/Hero';
import Programs  from './Components/Programs/Programs';
import AboutUs from './Components/AboutUs/AboutUs';
import './App.css';
const App = () => {
  return (
      <>
      <div className='Home'>
        <Navbar />
        <Hero />
        <Programs /> 
        <AboutUs />
      </div>
      </>
  );
};

export default App;