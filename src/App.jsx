import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './Components/NavBar/Navbar';
import Hero from './Components/Hero/Hero';
import Programs from './Components/Programs/Programs';
import School from './Components/School/School';
import AboutUs from './Components/AboutUs/AboutUs';
import Testimonials from './Components/Testemonials/Testomonial';
import ContactUs from './Components/ContactUs/ContactUs';
import SocialButtons from './Components/SocialMediaButtons/SocialButtons';
import NoticeBoard from './Components/Notice/Notice';
import AnimatedCards from './Components/Moto/AnimatedCards';
import './App.css';

const ScrollToSection = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const sectionId = pathname === '/' ? 'hero' : pathname.substring(1); // Remove leading '/' for id
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pathname]);

  return null; // This component only handles scrolling, no UI
};

const App = () => {
  return (
    <Router>
      <div className="Home">
        <Navbar />
        <NoticeBoard />
        <SocialButtons />
        <ScrollToSection />
        <section id="hero">
          <Hero />
        </section>
        <section id="programs">
          <Programs />
        </section>
        <section id="school">
          <School />
        </section>
        <section id="about-us">
          <AboutUs />
        </section>
        <AnimatedCards />
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="contact-us">
          <ContactUs />
        </section>
      </div>
    </Router>
  );
};

export default App;