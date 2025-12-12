import React, { useRef, useEffect, useState, useCallback } from "react";
import styles from "@/features/landing/Programs/Programs.module.css";
import CourseCard from "@/features/landing/Programs/Course/CourseCard";
import { courses } from "@/features/landing/Programs/coursesData";

const useTitleAnimation = (ref) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles["animate-title"]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);
};

const Programs = () => {
  const scrollRef = useRef(null);
  const titleRef = useRef(null);
  const [expandedCard, setExpandedCard] = useState(null);

  useTitleAnimation(titleRef);

  const handleExpand = useCallback((index) => {
    setExpandedCard(index);
  }, []);

  const handleClose = useCallback(() => {
    setExpandedCard(null);
  }, []);

  return (
    <section className={styles["programs-section"]}>
      <h2 ref={titleRef} className={styles.title}>
        OUR COURSES
      </h2>
      <div className={styles.programs}>
        <div className={styles["course-card-container"]} ref={scrollRef}>
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
