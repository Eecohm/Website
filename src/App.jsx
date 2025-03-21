import React from 'react';
import Navbar from './Components/NavBar/Navbar';
import Hero from './Components/Hero/Hero';
import Programs  from './Components/Programs/Programs';
import AboutUs from './Components/AboutUs/AboutUs';
import Testimonials from './Components/Testemonials/Testomonial';
import ContactUs from './Components/ContactUs/ContactUs';
import SocialButtons from './Components/SocialMediaButtons/SocialButtons';
import './App.css';
const App = () => {
  return (
      <>
      <div className='Home'>
        <Navbar />
        < SocialButtons />
        <Hero />
        <Programs /> 
        <AboutUs />
        <Testimonials />
        <ContactUs />
      </div>
      </>
  );
};

export default App;