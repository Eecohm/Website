import React, { useRef, useEffect } from 'react';
import TeamHeader from './TeamHeader';
import TeamMember from './TeamMember';
import './MeetTheTeam.css';
import bibek from '../../../assets/Images/bibek.jpg'
import aalok from '../../../assets/Images/aalok.jpg'
import nirmal from '../../../assets/Images/nirmal.png'
import sumanu from '../../../assets/Images/sumanu.png'
import sumans from '../../../assets/Images/sumans.png'
import janardhan from '../../../assets/Images/janardhan.png'
import primila from '../../../assets/Images/pramila.png'
import pritam from '../../../assets/Images/pritam.png'
const teamMembers = [
  {
    name: 'AALOK KARKI',
    role: 'Chief Executive Officer',
    bio: 'A visionary CEO driving innovation and growth.',
    quote: '“Leadership is about inspiring others to achieve greatness.”',
    image: aalok,
    social: {
      facebook: 'https://www.facebook.com/aalok.karkinepali',
      phone: '9852646392',
      mail: 'eecohm.ceo@gmail.com',
    },
  },
  {
    name: 'BIBEK NEPAL',
    role: 'Operational Executive',
    bio: 'A strategic Operational Executive ensuring efficiency and excellence.',
    quote: '“Efficiency is doing things right; effectiveness is doing the right things.”',
    image: bibek,
    social: {
      facebook: 'https://www.facebook.com/bibek.nepal.779',
      phone: '9861760481',
      mail: 'eecohm.coordinator@gmail.com',
    },
  },
  {
    name: 'SUMAN SHRESTHA',
    role: 'Finance Executive',
    bio: 'A strategic Finance Executive ensuring financial stability and growth.',
    quote: 'A strategic Finance Executive ensuring financial stability and growth.',
    image: sumans,
    social: {
      facebook: 'https://www.facebook.com/redfuzz',
      phone: '9817932424',
      mail: 'eecohm.finance@gmail.com',
    },
  },
  {
    name: 'SUMAN UPRETY',
    role: 'Marketing Executive',
    bio: 'A dynamic Marketing Executive driving brand awareness and engagement.',
    quote: '“Marketing is telling the world you’re a rock star.”',
    image: sumanu,
    social: {
      facebook: 'https://www.facebook.com/suman.narine',
      phone: '9818489385',
      mail: 'upretysuman9@gmail.com',
    },
  },
  {
    name: 'PRAMILA BAJGAIN',
    role: 'Academic Executive',
    bio: 'A dedicated Academic Executive fostering excellence in education.',
    quote: '“Empowering young minds driven for the stars, driven by passion and purpose.”',
    image: primila,
    social: {
      facebook: 'https://www.facebook.com/pramila.bajgain',
      phone: '9842656772',
      mail: 'pramilab283@gmail.com',
    },
  },
  {
    name: 'NIRMAL KHANAL',
    role: 'Operational Coordinator',
    bio: 'An efficient Operational Coordinator streamlining processes for success.',
    quote: '“Coordination is the key to seamless success.”',
    image: nirmal,
    social: {
      facebook: 'https://facebook.com/reechakhawas',
      phone: '9829726461',
      mail: 'eecohm@gmail.com',
    },
  },
  {
    name: 'JANARDAN DAHAL',
    role: 'Operating Officer',
    bio: 'A proactive Operation Officer optimizing workflows.',
    quote: '“Good project management turns vision into reality.”',
    image: janardhan,
    social: {
      facebook: 'https://facebook.com/janardhansharma',
      phone: '9815908872',
      mail: 'mailto:janardhan.sharma@example.com',
    },
  },
  {
    name: 'PRITAM KOIRALA',
    role: 'Finance Officer',
    bio: 'A meticulous Finance Officer managing budgets and financial health.',
    quote: '“Success is the sum of small efforts, repeated day in and day out.”',
    image: pritam,
    social: {
      facebook: 'https://www.facebook.com/pritam0110',
      phone: '9801430110',
      mail: 'pritamkoirala@gmail.com',
    },
  },
  
];

function MeetTheTeam() {
  const teamMembersRef = useRef(null);

  useEffect(() => {
    const teamMembersContainer = teamMembersRef.current;

    const handleWheel = (e) => {
      e.preventDefault(); // Prevent default vertical page scroll

      const scrollSpeed = 100; // Adjust scroll speed (pixels per wheel tick)
      const currentScroll = teamMembersContainer.scrollLeft;
      const maxScroll = teamMembersContainer.scrollWidth - teamMembersContainer.clientWidth;
      let newScroll = currentScroll + e.deltaY * scrollSpeed;

      // Clamp the scroll position to prevent overscrolling
      newScroll = Math.max(0, Math.min(newScroll, maxScroll));

      // Smoothly scroll to the new position
      teamMembersContainer.scrollTo({
        left: newScroll,
        behavior: 'smooth',
      });
    };

    if (teamMembersContainer) {
      teamMembersContainer.addEventListener('wheel', handleWheel, { passive: false });
    }

    // Cleanup event listener on unmount
    return () => {
      if (teamMembersContainer) {
        teamMembersContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <section className="meet-the-team">
      <TeamHeader />
      <div className="team-members" ref={teamMembersRef}>
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </section>
  );
}

export default MeetTheTeam;