

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styling/setTimer.css';

function SetTimer({ setTimerSettings }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isInterval, setIsInterval] = useState(false);
  const [includePause, setIncludePause] = useState(false);
  const navigate = useNavigate();

  const handleStartTimer = () => {
    setTimerSettings({
      hours,
      minutes,
      seconds,
      isInterval,
      includePause,
    });
    navigate('/digital');
  };

  return (
    <div className="set-timer-container">
      <h2 className="title">Set Timer</h2>
      <div className="time-inputs">
        <label>
          Hours:
          <input type="number" value={hours} onChange={(e) => setHours(Math.max(0, Math.floor(Number(e.target.value))))} />
        </label>
        <label>
          Minutes:
          <input type="number" value={minutes} onChange={(e) => setMinutes(Math.max(0, Math.min(59, Math.floor(Number(e.target.value)))))} />
        </label>
        <label>
          Seconds:
          <input type="number" value={seconds} onChange={(e) => setSeconds(Math.max(0, Math.min(59, Math.floor(Number(e.target.value)))))} />
        </label>
      </div>
      <div className="checkboxes">
        <div>
          <input
            type="checkbox"
            id="interval"
            checked={isInterval}
            onChange={(e) => {
              setIsInterval(e.target.checked);
              if (!e.target.checked) setIncludePause(false);
            }}
          />
          <label htmlFor="interval">Repeat Timer in Intervals</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="pause"
            checked={includePause}
            onChange={(e) => setIncludePause(e.target.checked)}
            disabled={!isInterval}
          />
          <label htmlFor="pause">Include 5-minute pause between intervals</label>
        </div>
      </div>
      <button className="start-button" onClick={handleStartTimer}>Start Timer</button>
    </div>
  );
}

export default SetTimer;
