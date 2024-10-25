import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styling/loading.css';

function LoadingScreen() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  // Hanterar klickhändelsen för hjärtat
  const handleHeartClick = () => {
    setClicked(true); 
    setTimeout(() => {
      navigate('/set-timer'); // Navigera efter en liten fördröjning
    }, 400); 
  };

  return (
    <div className="loading-container">
      <div
        className={`heart ${clicked ? 'clicked' : ''}`}
        onClick={handleHeartClick}
      ></div>
      <h2>Welcome to the Timer App</h2>
    </div>
  );
}

export default LoadingScreen;
