import React from 'react';
import Navbar from './Components/NavBar/Navbar';
import Hero from './Components/Hero/Hero';
import Programs  from './Components/Programs/Programs';
import './App.css';
const App = () => {
  return (
      <>
      <div className='Home'>
        <Navbar />
        <Hero />
        <Programs /> 
      </div>
      </>
  );
};

export default App;