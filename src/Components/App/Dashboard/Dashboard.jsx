
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import NavBar from '../NavBar/NavBar';

const Dashboard = () => {
  return (
    <>
    <NavBar />
    <div className="dashboard">
      <h1>This is DashBoard</h1>
    </div>
    </>
  );
};

export default Dashboard;
