import React, { useState, useRef, useEffect } from 'react';
import LeadsHeader from './LeadsHeader';
import TeamLeadCard from './TeamLeadCard';
import './MeetTheTeamLeads.css';

const teamLeads = [
  {
    "name": "AI and Robotics Innovation Lab",
    "bio": "The AI and Robotics Innovation Lab fosters hands-on learning in artificial intelligence, robotics, and automation, empowering students to develop real-world technological solutions. With state-of-the-art equipment and expert guidance, students can build and test their own robotic models and AI systems. This lab encourages problem-solving, creativity, and innovation, preparing students for future careers in tech-driven industries.",
    "image": "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    "name": "Advanced Computer Laboratory",
    "bio": "Equipped with high-performance computers and the latest software, the computer lab provides students with a cutting-edge digital learning experience. It offers hands-on training in programming, multimedia, and graphic design, helping students develop essential technical skills. This lab serves as a foundation for digital literacy and career readiness in the ever-evolving tech industry.",
    "image": "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    "name": "STEM Research and Development Center",
    "bio": "The STEM Research and Development Center is a hub for innovation, allowing students to work on real-world technology projects. From mechanical engineering to software development, this space provides tools and resources to nurture young inventors. It encourages critical thinking, teamwork, and experimentation, fostering the next generation of scientists and engineers.",
    "image": "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    "name": "Auditorium Hall for Events and Seminars",
    "bio": "The auditorium is a grand venue for hosting academic seminars, guest lectures, and cultural performances. Designed with modern acoustics and seating arrangements, it provides a comfortable space for large gatherings. This hall serves as a platform for students to showcase their talents, engage in intellectual discussions, and participate in various school events.",
    "image": "https://images.pexels.com/photos/736716/pexels-photo-736716.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    "name": "Agro Farming Learning Center",
    "bio": "The Agro Farming Learning Center provides students with practical knowledge of modern and sustainable agricultural techniques. Through hands-on experience, students learn about organic farming, irrigation systems, and the importance of eco-friendly farming practices. This center aims to create awareness about food production, sustainability, and environmental responsibility.",
    "image": "https://images.pexels.com/photos/2092579/pexels-photo-2092579.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    "name": "Multimedia and Creative Arts Lab",
    "bio": "The Multimedia and Creative Arts Lab is a space designed for students to explore digital content creation, including video editing, animation, and graphic design. With industry-standard tools and software, students can bring their creative ideas to life. This lab nurtures artistic expression and technological proficiency, preparing students for careers in media and design.",
    "image": "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    "name": "Library with IELTS Learning Resources",
    "bio": "The library is a treasure trove of knowledge, offering a vast collection of books, research materials, and digital resources. It includes a special section for IELTS preparation, helping students enhance their English language skills for higher education and global opportunities. With a quiet and comfortable reading environment, students can cultivate a love for reading and academic excellence.",
    "image": "https://images.pexels.com/photos/137029/pexels-photo-137029.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    "name": "Co-Curricular and Extra Curricular Activities",
    "bio": "Our school emphasizes holistic development by offering a variety of co-curricular and extracurricular activities. Students can participate in speech competitions, quizzes, poetry recitations, singing, dancing, and art and craft programs. These activities help build confidence, communication skills, and creativity, allowing students to explore their passions beyond academics.",
    "image": "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    "name": "STEM and Student Clubs",
    "bio": "The STEM and Student Clubs provide a collaborative space for students interested in science, technology, engineering, and mathematics. These clubs encourage hands-on experimentation, group projects, and competitions to enhance problem-solving skills. Students develop teamwork and leadership abilities while working on innovative technology-based projects.",
    "image": "https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    "name": "Professional Sports Training with Expert Coaches",
    "bio": "Our school provides professional sports training under the guidance of experienced coaches to help students develop their athletic potential. Training programs include various sports such as football, basketball, athletics, and martial arts. Through structured coaching and competitive events, students enhance their physical fitness, discipline, and teamwork skills.",
    "image": "https://images.pexels.com/photos/1078984/pexels-photo-1078984.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    "name": "Swimming Pool and Play Zone",
    "bio": "The swimming pool and play zone offer students a recreational space to relax and stay physically active. With trained instructors, students can learn swimming techniques, while the play zone provides fun activities for younger children. These facilities promote fitness, coordination, and a healthy lifestyle in an enjoyable environment.",
    "image": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    "name": "Art Gallery and Creative Expression Space",
    "bio": "The Art Gallery serves as a platform for students to exhibit their creative works, including paintings, sculptures, and digital art. It fosters artistic talent by encouraging students to explore different mediums of expression. This space nurtures imagination, critical thinking, and appreciation for visual arts in a supportive and inspiring setting.",
    "image": "https://images.pexels.com/photos/3184307/pexels-photo-3184307.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    "name": "Kids’ Pool Room and Play Area",
    "bio": "The Kids’ Pool Room and Play Area is a specially designed space for young children to engage in fun and safe activities. The mini pool allows them to enjoy water play under supervision, while the play area is filled with interactive games and learning tools. This environment helps in early childhood development by fostering motor skills, social interaction, and creativity.",
    "image": "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=200"
  }
]
;

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
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Split teamLeads into two groups
  const firstGroup = teamLeads.slice(0, 6);
  const secondGroup = teamLeads.slice(6, 12);

  return (
    <section className="meet-the-team-leads" ref={sectionRef}>
      <LeadsHeader />
      <div className="team-leads-container">
        <div className="team-leads-slideshow">
          {firstGroup.map((lead, index) => (
            <TeamLeadCard
              key={index}
              {...lead}
              isSelected={selectedLead && lead.name === selectedLead.name}
              onSelect={() => handleSelectLead(lead)}
            />
          ))}
        </div>
        <div className="team-leads-slideshow">
          {secondGroup.map((lead, index) => (
            <TeamLeadCard
              key={index + 6} // Offset index to avoid key collisions
              {...lead}
              isSelected={selectedLead && lead.name === selectedLead.name}
              onSelect={() => handleSelectLead(lead)}
            />
          ))}
        </div>
      </div>
      {/* Background shapes */}
      <div className="bg-shape shape-dot" style={{ top: '15%', left: '20%' }}></div>
      <div className="bg-shape shape-star" style={{ top: '25%', left: '70%' }}></div>
      <div className="bg-shape shape-dot" style={{ top: '50%', left: '10%' }}></div>
      <div className="bg-shape shape-star" style={{ top: '70%', left: '40%' }}></div>
      <div className="bg-shape shape-dot" style={{ top: '80%', left: '80%' }}></div>
    </section>
  );
}

export default MeetTheTeamLeads;