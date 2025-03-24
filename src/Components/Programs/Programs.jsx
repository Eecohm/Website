import React, { useRef, useEffect, useState } from 'react';
import './Programs.css';
import CourseCard from './Course/CourseCard';
import program_1 from '../../assets/Images/program_1.png';
import program_2 from '../../assets/Images/program_2.png';
import program_3 from '../../assets/Images/program_3.png';

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
      description: "This program equips future software developers, network administrators, and IT professionals with essential practical and theoritical skills. ",
      photo: program_3,
      duration: "2 years",
      keyFeatures: [
        "The +2 Advance Diploma in Computer Science is a two-year program designed for students.",
        "Aspiring to build a strong foundation in computer science and IT-related fields. ",
        "Dual Certification NEB + Advanced Diploma in Computer Science.",
        "Industry Relevant Curriculum which  covers all the industry standard technologies.",
        "Web Hands on Learning through practical sessions, projects, and internships.",
        "Career Oriented Approach which prepares students for higher education and IT careers.",
        "Inculdes networking, programming with different langugages (C++, Python, SQL )."],
      targetedAudience: [],
    },
    {
      courseName: "+2 with Advance Diploma in Hotel Management",
      description: "This specialized program helps students enhance their career prospects in the dynamic industry of hospitality with internationally recognized credentials.",
      photo: program_2,
      duration: "2 years",
      keyFeatures: [
        "Dual certification, combining: NEB, Certification UK-Accredite Diploma.",
        "Practical training and internship opportunities in reputed hotels.",
        "Job opportunities in Nepal and internationally.",
        "Industry releveant skills to excel in global hospitality industry."
      ],
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
        "Opportunities for Certification and skill development workshops."],
    },
    {
      courseName: "+2 with Business Studies",
      description: "This program equips students with foundational business knowledge and critical thinking skills essential for modern commerce. It integrates practical training in management, finance, and marketing to prepare students for diverse career paths.",
      photo: program_3,
      duration: "2 years",
      keyFeatures: [
        "Business fundamentals are taught through real-world case studies and projects.",
        "Finance basics include budgeting, investment analysis, and financial planning skills.",
        "Marketing strategies cover digital marketing, branding, and consumer behavior analysis.",
        "Entrepreneurship encourages innovative thinking and business startup development Graduates are prepared for leadership roles in hotels through a structured NEB curriculum. skills."
      ],
      targetedAudience: ["Business aspirants", "Young entrepreneurs", "High school students"],
    },
    {
      courseName: "+2 with Hotel Management",
      description: "This course introduces students to the hospitality industry with a focus on practical skills. It combines business management principles with hands-on training in hotel operations and customer service.",
      photo: program_3,
      duration: "2 years",
      keyFeatures: [
        "Business fundamentals provide a strong base for managing hospitality enterprises effectively.",
        "Finance basics teach cost management, revenue tracking, and budgeting for hotels.",
        "Marketing strategies include promoting tourism and enhancing guest experience techniques.",
        "Entrepreneurship fosters skills to launch and operate successful hospitality ventures."
      ],
      targetedAudience: ["Business aspirants", "Young entrepreneurs", "High school students"],
    },
    {
      courseName: "+2 with Computer Science",
      description: "This program blends computer science with business education for a comprehensive learning experience. Students gain technical expertise in programming and systems alongside management and marketing knowledge.",
      photo: program_3,
      duration: "2 years",
      keyFeatures: [
        "Business fundamentals help students understand IT project management and operations.",
        "Finance basics cover budgeting for tech projects and resource allocation strategies.",
        "Marketing strategies teach promoting software products and digital services effectively.",
        "Entrepreneurship develops skills to create innovative tech startups and solutions."
      ],
      targetedAudience: ["Business aspirants", "Young entrepreneurs", "High school students"],
    },
    {
      courseName: "Pre-School to Secondary",
      description: "This program offers a complete educational journey from pre-school to secondary levels. It emphasizes holistic development through academics, skills, and extracurricular activities for young learners.",
      photo: program_3,
      duration: "10 years",
      keyFeatures: [
        "Holistic education integrates academics with emotional and social development skills.",
        "Skill development focuses on critical thinking, creativity, and practical abilities.",
        "Academic foundation ensures strong proficiency in core subjects like math and science.",
        "Extracurriculars encourage participation in sports, arts, and leadership activities."
      ],
      targetedAudience: ["Young learners", "Parents seeking quality education", "Future scholars"],
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