import React, { useRef, useEffect } from 'react';
import './Programs.css';
import CourseCard from './Course/CourseCard';
import program_1 from '../../assets/Images/program_1.png';
import program_2 from '../../assets/Images/program_2.png';
import program_3 from '../../assets/Images/program_3.png';

const Programs = () => {
  const scrollRef = useRef(null);
  const titleRef = useRef(null);

  // Mouse wheel horizontal scrolling
  useEffect(() => {
    const container = scrollRef.current;
    
    const handleWheel = (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    if (container) {
      container.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // Title animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-title');
            observer.unobserve(entry.target); // Run animation only once
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of title is visible
      }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <section className="programs-section">
      <header>
        <h2 ref={titleRef} className="title">OUR COURSES</h2>
      </header>
      <div className="programs" ref={scrollRef}>
        <div className="course-card-container">
          <CourseCard
            courseName="Advance Diploma in Computer Science"
            description="Learn to build modern web applications using React, Node.js, and more."
            photo={program_1}
          />
          <CourseCard
            courseName="+2 with Advance Diploma in Computer Science"
            description="Learn to build modern web applications using React, Node.js, and more."
            photo={program_3}
          />
          <CourseCard
            courseName="Advance Diploma in Hotel Management"
            description="Learn to build modern web applications using React, Node.js, and more."
            photo={program_2}
          />
          <CourseCard
            courseName="Diploma in Hotel Management"
            description="Learn to build modern web applications using React, Node.js, and more."
            photo={program_3}
          />
          <CourseCard
            courseName="+2 with Advance Diploma in Hotel Management"
            description="Learn to build modern web applications using React, Node.js, and more."
            photo={program_3}
          />
          <CourseCard
            courseName="+2 with Business Studies"
            description="Learn to build modern web applications using React, Node.js, and more."
            photo={program_3}
          />
          <CourseCard
            courseName="Pre-School to Secondary"
            description="Learn to build modern web applications using React, Node.js, and more."
            photo={program_3}
          />
        </div>
      </div>
    </section>
  );
};

export default Programs;