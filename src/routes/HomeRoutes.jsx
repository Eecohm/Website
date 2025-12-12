import React from 'react';
import Navbar from '@/features/landing/NavBar/Navbar';
import Hero from '@/features/landing/Hero/Hero';
import Programs from '@/features/landing/Programs/Programs';
import School from '@/features/landing/School/School';
import AboutUs from '@/features/landing/AboutUs/AboutUs';
import Testimonials from '@/features/landing/Testemonials/Testomonial';
import ContactUs from '@/features/landing/ContactUs/ContactUs';
import SocialButtons from '@/features/landing/SocialMediaButtons/SocialButtons';
import AnimatedCards from '@/features/landing/Moto/AnimatedCards';
import ScrollToSection from '@/routes/ScrollTo';

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