import React from 'react';
import TeamHeader from './TeamHeader';
import TeamMember from './TeamMember';
import './MeetTheTeam.css';

const teamMembers = [
  {
    name: 'AALOK KARKI',
    role: 'CEO',
    bio: 'Passionate about coding and coffee.',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150', // Professional male portrait
    social: {
      facebook: 'https://facebook.com/aalokkarki',
      phone: 'tel:+1234567890',
      mail: 'mailto:aalok.karki@example.com',
    },
  },
  {
    name: 'PRAMILA BAJGAIN',
    role: 'UI/UX Designer',
    bio: 'Loves designing intuitive experiences.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', // Creative female portrait
    social: {
      facebook: 'https://facebook.com/pramilabajgain',
      phone: 'tel:+1234567891',
      mail: 'mailto:pramila.bajgain@example.com',
    },
  },
  {
    name: 'BIBEK NEPAL',
    role: 'Project Manager',
    bio: 'Keeps the team on track and smiling.',
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150', // Male with confident look
    social: {
      facebook: 'https://facebook.com/bibeknepal',
      phone: 'tel:+1234567892',
      mail: 'mailto:bibek.nepal@example.com',
    },
  },
  {
    name: 'NIRMAL NIROULA',
    role: 'Project Manager',
    bio: 'Keeps the team on track and smiling.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150', // Male in professional setting
    social: {
      facebook: 'https://facebook.com/nirmalnirola',
      phone: 'tel:+1234567893',
      mail: 'mailto:nirmal.nirola@example.com',
    },
  },
  {
    name: 'SUMAN SHRESTHA',
    role: 'Project Manager',
    bio: 'Keeps the team on track and smiling.',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150', // Female with friendly vibe
    social: {
      facebook: 'https://facebook.com/sumanshrestha',
      phone: 'tel:+1234567894',
      mail: 'mailto:suman.shrestha@example.com',
    },
  },
  {
    name: 'PRITAM KOIRALA',
    role: 'Project Manager',
    bio: 'Keeps the team on track and smiling.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', // Male with serious expression
    social: {
      facebook: 'https://facebook.com/pritamkoirala',
      phone: 'tel:+1234567895',
      mail: 'mailto:pritam.koirala@example.com',
    },
  },
  {
    name: 'REECHA KHAWAS',
    role: 'Project Manager',
    bio: 'Keeps the team on track and smiling.',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150', // Female with professional look
    social: {
      facebook: 'https://facebook.com/reechakhawas',
      phone: 'tel:+1234567896',
      mail: 'mailto:reecha.khawas@example.com',
    },
  },
  {
    name: 'JANARDHAN SHARMA',
    role: 'Project Manager',
    bio: 'Keeps the team on track and smiling.',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150', // Male in business attire
    social: {
      facebook: 'https://facebook.com/janardhansharma',
      phone: 'tel:+1234567897',
      mail: 'mailto:janardhan.sharma@example.com',
    },
  },
];

function MeetTheTeam() {
  return (
    <section className="meet-the-team">
      <TeamHeader />
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </section>
  );
}

export default MeetTheTeam;