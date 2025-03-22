import React, { useState, useRef, useEffect } from 'react';
import LeadsHeader from './LeadsHeader';
import TeamLeadCard from './TeamLeadCard';
import './MeetTheTeamLeads.css';

const teamLeads = [
    {
      "name": "Ethan Williams",
      "role": "AI Engineer",
      "bio": "Develops cutting-edge AI solutions.",
      "image": "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200",
      "social": {
        "facebook": "https://facebook.com/ethanwilliams",
        "phone": "tel:+1234567895",
        "mail": "mailto:ethan.williams@example.com"
      }
    },
    {
      "name": "Olivia Johnson",
      "role": "UX Researcher",
      "bio": "Understands users to create better experiences.",
      "image": "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
      "social": {
        "facebook": "https://facebook.com/oliviajohnson",
        "phone": "tel:+1234567896",
        "mail": "mailto:olivia.johnson@example.com"
      }
    },
    {
      "name": "Mason Clark",
      "role": "Cybersecurity Analyst",
      "bio": "Keeps systems safe from cyber threats.",
      "image": "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=200",
      "social": {
        "facebook": "https://facebook.com/masonclark",
        "phone": "tel:+1234567897",
        "mail": "mailto:mason.clark@example.com"
      }
    },
    {
      "name": "Daniel Green",
      "role": "Data Scientist",
      "bio": "Transforms data into actionable insights.",
      "image": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
      "social": {
        "facebook": "https://facebook.com/danielgreen",
        "phone": "tel:+1234567899",
        "mail": "mailto:daniel.green@example.com"
      }
    },
    {
      "name": "Emily Carter",
      "role": "Software Architect",
      "bio": "Designs scalable and efficient software systems.",
      "image": "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
      "social": {
        "facebook": "https://facebook.com/emilycarter",
        "phone": "tel:+1234567800",
        "mail": "mailto:emily.carter@example.com"
      }
    },
    {
      "name": "Lucas Turner",
      "role": "DevOps Engineer",
      "bio": "Ensures smooth CI/CD pipelines.",
      "image": "https://images.pexels.com/photos/736716/pexels-photo-736716.jpeg?auto=compress&cs=tinysrgb&w=200",
      "social": {
        "facebook": "https://facebook.com/lucasturner",
        "phone": "tel:+1234567801",
        "mail": "mailto:lucas.turner@example.com"
      }
    },
  ];

function MeetTheTeamLeads() {
  const [selectedLead, setSelectedLead] = useState(null);
  const sectionRef = useRef(null);

  const handleSelectLead = (lead) => {
    setSelectedLead(selectedLead && selectedLead.name === lead.name ? null : lead);
  };

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;
    const shapes = section.querySelectorAll('.bg-shape');
    const { clientX, clientY } = e;
    const { left, top, width, height } = section.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5; // -0.5 to 0.5
    const y = (clientY - top) / height - 0.5;

    shapes.forEach((shape, index) => {
      const moveX = x * (20 + index * 10); // Adjusted for smaller shapes
      const moveY = y * (20 + index * 10);
      shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section className="meet-the-team-leads" ref={sectionRef}>
      <LeadsHeader />
      <div className="team-leads-slideshow">
        {teamLeads.map((lead, index) => (
          <TeamLeadCard
            key={index}
            {...lead}
            isSelected={selectedLead && lead.name === selectedLead.name}
            onSelect={() => handleSelectLead(lead)}
          />
        ))}
      </div>
      {/* Space-themed background dots and stars */}
      <div className="bg-shape shape-dot" style={{ top: '15%', left: '20%' }}></div>
      <div className="bg-shape shape-star" style={{ top: '25%', left: '70%' }}></div>
      <div className="bg-shape shape-dot" style={{ top: '50%', left: '10%' }}></div>
      <div className="bg-shape shape-star" style={{ top: '70%', left: '40%' }}></div>
      <div className="bg-shape shape-dot" style={{ top: '80%', left: '80%' }}></div>
      <div className="bg-shape shape-dot" style={{ top: '65%', left: '24%' }}></div>
      <div className="bg-shape shape-star" style={{ top: '25%', left: '70%' }}></div>
      <div className="bg-shape shape-dot" style={{ top: '50%', left: '40%' }}></div>
      <div className="bg-shape shape-star" style={{ top: '80%', left: '90%' }}></div>
      <div className="bg-shape shape-dot" style={{ top: '40%', left: '87%' }}></div>
    </section>
  );
}

export default MeetTheTeamLeads;