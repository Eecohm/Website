import React from 'react';
import Navbar from '@/Components/Website/NavBar/Navbar';
import Hero from '@/Components/Website/Hero/Hero';
import Programs from '@/Components/Website/Programs/Programs';
import School from '@/Components/Website/School/School';
import AboutUs from '@/Components/Website/AboutUs/AboutUs';
import Testimonials from '@/Components/Website/Testemonials/Testomonial';
import ContactUs from '@/Components/Website/ContactUs/ContactUs';
import SocialButtons from '@/Components/Website/SocialMediaButtons/SocialButtons';
import AnimatedCards from '@/Components/Website/Moto/AnimatedCards';
import ScrollToSection from '@/Routs/ScrollTo';

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