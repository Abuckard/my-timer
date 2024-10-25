import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styling/setTimer.css';

function SetTimer({ setTimerSettings }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isInterval, setIsInterval] = useState(false); // Checkbox för intervall
  const [includePause, setIncludePause] = useState(false); // Checkbox för paus
  const navigate = useNavigate();

  const handleStartTimer = () => {
    const timerSettings = {
      hours,
      minutes,
      seconds,
      isInterval,
      includePause,
    };

    // Skicka timerinställningar 
    setTimerSettings(timerSettings);

    // Navigera till Digital-timern
    navigate('/digital');
  };

  // Hanterar inmatning för timmar, minuter och sekunder
  const handleTimeInput = (setter) => (e) => {
    const value = Math.max(0, Math.floor(Number(e.target.value))); // Förhindrar negativa tal och decimaler
    setter(value);
  };

  return (
    <div className="set-timer-container">
      <h2 className="title">Set Timer</h2>
      <div className="time-inputs">
        <label>
          Hours:
          <input
            type="number"
            value={hours === 0 ? '' : hours}  // Visar tomt när värdet är 0
            onChange={handleTimeInput(setHours)}  // Uppdatera när användaren skriver
            placeholder="0"
            min="0"
          />
        </label>
        <label>
          Minutes:
          <input
            type="number"
            value={minutes === 0 ? '' : minutes}
            onChange={handleTimeInput(setMinutes)}
            placeholder="0"
            min="0"
            max="59"  // Begränsa till maximalt 59 minuter
          />
        </label>
        <label>
          Seconds:
          <input
            type="number"
            value={seconds === 0 ? '' : seconds}
            onChange={handleTimeInput(setSeconds)}
            placeholder="0"
            min="0"
            max="59"  // Begränsa till maximalt 59 sekunder
          />
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
              if (!e.target.checked) {
                setIncludePause(false);
              }
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
            disabled={!isInterval}  // Paus kan endast väljas om intervall är valt
          />
          <label htmlFor="pause">Include 5-minute pause between intervals</label>
        </div>
      </div>

      <button className="start-button" onClick={handleStartTimer}>Start Timer</button>
    </div>
  );
}

export default SetTimer;

