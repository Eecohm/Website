import React from 'react';
import Navbar from './Components/NavBar/Navbar';
import Hero from './Components/Hero/Hero';
import Background from './Components/Background/background';
import './App.css';
const App = () => {
  return (
      <>
      <div className='Home'>
        <Navbar />
        <Hero />
      </div>
      </>
  );
};

export default App;