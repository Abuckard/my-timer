import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styling/loading.css'; // Importera CSS-filen

function LoadingScreen() {
  const navigate = useNavigate();

  return (
    <div className="loading-container">

      <div className="heart" onClick={() => navigate('/set-timer')}></div> {/* Klickbart hjärta */}

    </div>
  );
}

export default LoadingScreen;
