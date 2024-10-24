import React, { useEffect, useState } from 'react';
import './styling/pause.css';  // Länk till CSS-filen
import { useNavigate } from 'react-router-dom';

function Pause({ timer, onStopPause }) {
  const [pauseTime, setPauseTime] = useState('00:05:00'); // Exempel på 5 minuters nedräkning
  const navigate = useNavigate();

  useEffect(() => {
    if (timer) {
      timer.start({
        countdown: true,
        startValues: { minutes: 5, seconds: 0 },
      });

      timer.addEventListener('secondsUpdated', () => {
        setPauseTime(timer.getTimeValues().toString());
      });

      timer.addEventListener('targetAchieved', () => {
        navigate('/digital');  // Efter pausen går du tillbaka till digitala vyn
      });
    }

    return () => {
      timer.removeEventListener('secondsUpdated');
      timer.removeEventListener('targetAchieved');
    };
  }, [timer, navigate]);

  return (
    <div className="pause-container">
      <h1 className="pause-title">Pause</h1>
      <div className="pause-timer">{pauseTime}</div>
      <p className="pause-description">
        Time to take a short break! The next interval will start after this pause.
      </p>
      <button className="pause-stop-button" onClick={onStopPause}>
        Stop Pause
      </button>
    </div>
  );
}

export default Pause;
