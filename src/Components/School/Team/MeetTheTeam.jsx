import React from 'react';
import TeamHeader from './TeamHeader';
import TeamMember from './TeamMember';
import './MeetTheTeam.css';

const teamMembers = [
  {
    name: 'AALOK KARKI',
    role: 'Chief Executive Officer',
    bio: 'With Great power comes great responsibility',
    quote: '“Leadership is about inspiring others to achieve greatness.”',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    social: {
      facebook: 'https://www.facebook.com/aalok.karkinepali',
      phone: '9842646392',
      mail: 'eecohm.ceo@gmail.com',
    },
  },
  {
    name: 'BIBEK NEPAL',
    role: 'Operational Executive',
    bio: 'Loves designing intuitive experiences.',
    quote: '“Efficiency is doing things right; effectiveness is doing the right things.”',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    social: {
      facebook: 'https://www.facebook.com/bibek.nepal.779',
      phone: '9861760481',
      mail: 'eecohm.coordinator@gmail.com',
    },
  },
  {
    name: 'SUMAN SHRESTHA',
    role: 'Finance Executive',
    bio: 'Keeps the team on track and smiling.',
    quote: '“A budget is telling your money where to go instead of wondering where it went.”',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    social: {
      facebook: 'https://www.facebook.com/redfuzz',
      phone: '9817932424',
      mail: 'eecohm.finance@gmail.com',
    },
  },
  {
    name: 'SUMAN UPRETY',
    role: 'Marketing Executive',
    bio: 'Keeps the team on track and smiling.',
    quote: '“Marketing is telling the world you’re a rock star.”',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    social: {
      facebook: 'https://www.facebook.com/suman.narine',
      phone: '9818489385',
      mail: 'upretysuman9@gmail.com',
    },
  },
  {
    name: 'PRAMILA BAJGAIN',
    role: 'Academic Executive',
    bio: 'Keeps the team on track and smiling.',
    quote: '“Education is the most powerful weapon you can use to change the world.”',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    social: {
      facebook: 'https://www.facebook.com/pramila.bajgain',
      phone: '9842656772',
      mail: 'pramilab283@gmail.com',
    },
  },
  {
    name: 'NIRMAL KHANAL',
    role: 'Operational Coordinator',
    bio: 'Keeps the team on track and smiling.',
    quote: '“Coordination is the key to seamless success.”',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    social: {
      facebook: 'https://facebook.com/reechakhawas',
      phone: '9829726461',
      mail: 'eecohm@gmail.com',
    },
  },
  {
    name: 'JANARDHAN SHARMA',
    role: 'Operating Officer',
    bio: 'Keeps the team on track and smiling.',
    quote: '“Good project management turns vision into reality.”',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150',
    social: {
      facebook: 'https://facebook.com/janardhansharma',
      phone: '9815908872',
      mail: 'mailto:janardhan.sharma@example.com',
    },
  },
  {
    name: 'PRITAM KOIRALA',
    role: 'Finance Officer',
    bio: 'Keeps the team on track and smiling.',
    quote: '“Success is the sum of small efforts, repeated day in and day out.”',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150',
    social: {
      facebook: 'https://www.facebook.com/pritam0110',
      phone: '9701430110',
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