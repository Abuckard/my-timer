import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styling/loading.css'; // Importera din CSS

function LoadingScreen() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  // Hanterar klickhändelsen för hjärtat
  const handleHeartClick = () => {
    setClicked(true); // Markera att hjärtat är klickat
    setTimeout(() => {
      navigate('/set-timer'); // Navigera efter en liten fördröjning
    }, 300); // 300ms matchar transition-duration i CSS
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
