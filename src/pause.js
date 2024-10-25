import React, { useEffect, useState } from 'react';
import './styling/pause.css'; 
import { useNavigate } from 'react-router-dom';

function Pause({ timer }) {
  const [pauseTime, setPauseTime] = useState('00:05:00'); 
  const navigate = useNavigate();

  useEffect(() => {
    if (timer) {
      // Stoppa timern först för att säkerställa att inga tidigare inställningar påverkar
      timer.stop();
      // Starta timern med en specifik 5-minuters paus
      timer.start({
        countdown: true,
        startValues: { minutes: 5, seconds: 0 },
      });

      // Uppdatera displayen med nuvarande tid för pausen
      timer.addEventListener('secondsUpdated', () => {
        setPauseTime(timer.getTimeValues().toString());
      });

      // När pausen tar slut, navigera tillbaka till Digital-timern
      timer.addEventListener('targetAchieved', () => {
        navigate('/digital');
      });
    }

    return () => {
      if (timer) {
        timer.removeEventListener('secondsUpdated');
        timer.removeEventListener('targetAchieved');
      }
    };
  }, [timer, navigate]);

  // Stoppar pausen och navigerar tillbaka till "Set Timer"-vyn
  const handleStopPause = () => {
    if (timer) {
      timer.stop();
    }
    navigate('/set-timer'); 
  };

  return (
    <div className="pause-container">
      <h1 className="pause-title">Pause</h1>
      <div className="pause-timer">{pauseTime}</div>
      <div className="pause-emoji">😪</div>
      <p className="pause-description">
        Time to take a short break! The next interval will start after this pause.
      </p>
      <button className="pause-stop-button" onClick={handleStopPause}>
        Stop Pause
      </button>
    </div>
  );
}

export default Pause;
