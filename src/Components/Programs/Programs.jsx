import React, { useRef, useEffect, useState } from 'react';
import './Programs.css';
import CourseCard from './Course/CourseCard';
import css from '../../assets/Images/css.png';
import csimg from '../../assets/Images/cs.png';
import program_2 from '../../assets/Images/program_2.png';
import program_3 from '../../assets/Images/program_3.png';
// Example chef icon (replace with your own PNG URL)
import adhm from '../../assets/Icons/adhm-icon.svg'; 
import hm from '../../assets/Icons/hm-icon.svg'; 
import cs from '../../assets/Icons/cs-icon.svg'; 
import bs from '../../assets/Icons/bs-icon.svg'; 
import adcs from '../../assets/Icons/adcs-icon.svg'; 
import dhm from '../../assets/Icons/dhm-icon.svg'; 
import school from '../../assets/Icons/school-icon.svg'; 
const Programs = () => {
  const scrollRef = useRef(null);
  const titleRef = useRef(null);
  const [expandedCard, setExpandedCard] = useState(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-title');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
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

  const handleExpand = (index) => {
    setExpandedCard(index);
  };

  const handleClose = () => {
    setExpandedCard(null);
  };

  const courses = [
    {
      courseName: "+2 with Advance Diploma in Computer Science",
      description: "This program equips future software developers, network administrators, and IT professionals with essential practical and theoretical skills.",
      photo: csimg,
      duration: "2 years",
      keyFeatures: [
        "The +2 Advance Diploma in Computer Science is a two-year program designed for students.",
        "Aspiring to build a strong foundation in computer science and IT-related fields.",
        "Dual Certification NEB + Advanced Diploma in Computer Science.",
        "Industry Relevant Curriculum which covers all the industry standard technologies.",
        "Web Hands-on Learning through practical sessions, projects, and internships.",
        "Career Oriented Approach which prepares students for higher education and IT careers.",
        "Includes networking, programming with different languages (C++, Python, SQL).",
      ],
      icon: adcs, // Example computer icon
    },
    {
      courseName: "+2 with Advance Diploma in Hotel Management",
      description: "This specialized program helps students enhance their career prospects in the dynamic industry of hospitality with internationally recognized credentials.",
      photo: program_2,
      duration: "2 years",
      keyFeatures: [
        "Dual certification, combining: NEB, Certification UK-Accredited Diploma.",
        "Practical training and internship opportunities in reputed hotels.",
        "Job opportunities in Nepal and internationally.",
        "Industry relevant skills to excel in global hospitality industry.",
      ],
      icon: adhm, // Chef icon for hotel management
    },
    {
      courseName: "Diploma in Hotel Management (DHM)",
      description: "A great starting point for a rewarding career in one of the largest and most dynamic industries in the world ensuring students gain international-standard hospitality skills.",
      photo: program_3,
      duration: "1 year",
      keyFeatures: [
        "Industry Focused Curriculum with practical training",
        "Internship placement in top hotels and restaurants",
        "Experienced Faculty with real-world industry expertise.",
        "Opportunities for Certification and skill development workshops.",
      ],
      icon: dhm, // Chef icon for hotel management
    },
    {
      courseName: "+2 with Business Studies",
      description: "This program equips students with foundational business knowledge and critical thinking skills essential for modern commerce.",
      photo: program_3,
      duration: "2 years",
      keyFeatures: [
        "Business fundamentals are taught through real-world case studies and projects.",
        "Finance basics include budgeting, investment analysis, and financial planning skills.",
        "Marketing strategies cover digital marketing, branding, and consumer behavior analysis.",
        "Entrepreneurship encourages innovative thinking and business startup development.",
      ],
      icon: bs, // Example business icon
    },
    {
      courseName: "+2 with Hotel Management",
      description: "This course introduces students to the hospitality industry with a focus on practical skills.",
      photo: program_3,
      duration: "2 years",
      keyFeatures: [
        "Business fundamentals provide a strong base for managing hospitality enterprises effectively.",
        "Finance basics teach cost management, revenue tracking, and budgeting for hotels.",
        "Marketing strategies include promoting tourism and enhancing guest experience techniques.",
        "Entrepreneurship fosters skills to launch and operate successful hospitality ventures.",
      ],
      icon: hm, // Chef icon for hotel management
    },
    {
      courseName: "+2 with Computer Science",
      description: "This program blends computer science with business education for a comprehensive learning experience.",
      photo: css,
      duration: "2 years",
      keyFeatures: [
        "Business fundamentals help students understand IT project management and operations.",
        "Finance basics cover budgeting for tech projects and resource allocation strategies.",
        "Marketing strategies teach promoting software products and digital services effectively.",
        "Entrepreneurship develops skills to create innovative tech startups and solutions.",
      ],
      icon: cs, // Example computer icon
    },
    {
      courseName: "Pre-School to Secondary",
      description: "This program offers a complete educational journey from pre-school to secondary levels.",
      photo: program_3,
      duration: "10 years",
      keyFeatures: [
        "Holistic education integrates academics with emotional and social development skills.",
        "Skill development focuses on critical thinking, creativity, and practical abilities.",
        "Academic foundation ensures strong proficiency in core subjects like math and science.",
        "Extracurriculars encourage participation in sports, arts, and leadership activities.",
      ],
      icon: school, // Example education icon
    },
  ];

  return (
    <section className="programs-section">
      <header>
        <h2 ref={titleRef} className="title">OUR COURSES</h2>
      </header>
      <div className="programs" ref={scrollRef}>
        <div className="course-card-container">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              {...course}
              isExpanded={expandedCard === index}
              onExpand={() => handleExpand(index)}
              onClose={handleClose}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;