import React, { useState, useRef, useEffect } from "react";
import LeadsHeader from "@/features/landing/School/Team/TeamLead/LeadsHeader";
import TeamLeadsGrid from "@/features/landing/School/Team/TeamLead/TeamLeadsGrid";
import { teamLeads } from "@/features/landing/School/Team/TeamLead/teamLeadsData";
import styles from "@/features/landing/School/Team/TeamLead/MeetTheTeamLeads.module.css";

function MeetTheTeamLeads() {
  const [selectedLead, setSelectedLead] = useState(null);
  const sectionRef = useRef(null);

  const handleSelectLead = (lead) => {
    setSelectedLead(
      selectedLead && selectedLead.name === lead.name ? null : lead
    );
  };

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;
    const shapes = section.querySelectorAll(`.${styles.bgShape}`);
    const { clientX, clientY } = e;
    const { left, top, width, height } = section.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    shapes.forEach((shape, index) => {
      const moveX = x * (20 + index * 10);
      const moveY = y * (20 + index * 10);
      shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      return () => section.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section className={styles.meetTheTeamLeads} ref={sectionRef}>
      <LeadsHeader />
      <TeamLeadsGrid
        teamLeads={teamLeads}
        selectedLead={selectedLead}
        handleSelectLead={handleSelectLead}
      />
      <div
        className={`${styles.bgShape} ${styles.shapeDot}`}
        style={{ top: "15%", left: "20%" }}
      ></div>
      <div
        className={`${styles.bgShape} ${styles.shapeStar}`}
        style={{ top: "25%", left: "70%" }}
      ></div>
      <div
        className={`${styles.bgShape} ${styles.shapeDot}`}
        style={{ top: "50%", left: "10%" }}
      ></div>
      <div
        className={`${styles.bgShape} ${styles.shapeStar}`}
        style={{ top: "70%", left: "40%" }}
      ></div>
      <div
        className={`${styles.bgShape} ${styles.shapeDot}`}
        style={{ top: "80%", left: "80%" }}
      ></div>
    </section>
  );
}

export default MeetTheTeamLeads;
