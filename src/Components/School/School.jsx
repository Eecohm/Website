import React, { useState } from 'react';
import './School.css';
import image_1 from '../../assets/Images/program_1.png';
import image_2 from '../../assets/Images/program_2.png';
import image_3 from '../../assets/Images/program_1.png';
import image_4 from '../../assets/Images/program_3.png';
import MeetTheTeam from './Team/MeetTheTeam';
import TeamLeadCard from './Team/TeamLead/MeetTheTeamLeads';
const images = [
  { id: 1, src: image_1, title: 'Nature Beauty', description: 'A serene view of untouched landscapes.' },
  { id: 2, src: image_2, title: 'Urban Escape', description: 'The hustle and bustle of city life.' },
  { id: 3, src: image_3, title: 'Wild Adventure', description: 'Exploring the wilderness in style.' },
  { id: 4, src: image_4, title: 'Peaceful Retreat', description: 'A calm getaway from the chaos.' },
];

function ImageSlideshow() {

  return (
    <div className="school-main-div">
      <TeamLeadCard />
      <MeetTheTeam />
    </div>
  );
}

export default ImageSlideshow;