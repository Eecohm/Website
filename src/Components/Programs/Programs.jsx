// Programs.jsx
import React, { useRef, useEffect } from 'react';
import './Programs.css';
import CourseCard from './Course/CourseCard';
import program_1 from '../../assets/Images/program_1.png';
import program_2 from '../../assets/Images/program_2.png';
import program_3 from '../../assets/Images/program_3.png';

const Programs = () => {
  const scrollRef = useRef(null);

  // Add mouse wheel horizontal scrolling
  useEffect(() => {
    const container = scrollRef.current;
    
    const handleWheel = (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener('wheel', handleWheel);
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <>
    <h1 className='title'> OUR COURSES</h1>
    <div className="programs" ref={scrollRef}>
      <div className="course-card-container">
        <CourseCard
          courseName="Advance Diploma in Computer Science"
          description="Learn to build modern web applications using React, Node.js, and more."
          photo={program_1}
        />
        <CourseCard
          courseName="Advance Diploma in Hotel Managemet"
          description="Learn to build modern web applications using React, Node.js, and more."
          photo={program_2}
        />
        <CourseCard
          courseName="+2 with Computer Science"
          description="Learn to build modern web applications using React, Node.js, and more."
          photo={program_3}
        />
        <CourseCard
          courseName="+2 with Hotel Management"
          description="Learn to build modern web applications using React, Node.js, and more."
          photo={program_3}
        />
        <CourseCard
          courseName="+2 with Business Studies"
          description="Learn to build modern web applications using React, Node.js, and more."
          photo={program_3}
        />
        <CourseCard
          courseName="Nursery to Secondary"
          description="Learn to build modern web applications using React, Node.js, and more."
          photo={program_3}
        />
      </div>
    </div>
    </>
  );
};

export default Programs;