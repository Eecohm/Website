import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from '../Components/NavBar/Navbar';
import Hero from '../Components/Hero/Hero';
import Programs from '../Components/Programs/Programs';
import School from '../Components/School/School';
import AboutUs from '../Components/AboutUs/AboutUs';
import Testimonials from '../Components/Testemonials/Testomonial';
import ContactUs from '../Components/ContactUs/ContactUs';
import SocialButtons from '../Components/SocialMediaButtons/SocialButtons';
import NoticeBoard from '../Components/Notice/Notice';
import AnimatedCards from '../Components/Moto/AnimatedCards';
import PopupModal from '../Components/PopModel/PopupModal';
import ScrollToSection from '../Routs/ScrollTo';
import Login from '../Components/App/Login/Login';


const Home = () => {
  return (
            <div className="Home">
              <Navbar />
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
  );
};

export default Home;