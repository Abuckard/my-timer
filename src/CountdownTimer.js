import React, { useState, useRef } from 'react';
import Timer from 'easytimer.js'; 

function CountdownTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [displayTime, setDisplayTime] = useState('00:00:00');
  const timerRef = useRef(null);  

  const handleStart = () => {
    if (!timerRef.current) {
      timerRef.current = new Timer(); 
    }

    // Starta nedräkningen
    timerRef.current.start({
      countdown: true,
      startValues: { hours, minutes, seconds }
    });

    // Uppdatera skärmen varje sekund
    timerRef.current.addEventListener('secondsUpdated', () => {
      setDisplayTime(timerRef.current.getTimeValues().toString());
    });

    // Alert används inte men skulle visa att tiden är slut
    timerRef.current.addEventListener('targetAchieved', () => {
      alert('Tiden är slut!');
    });
  };

  const handleStop = () => {
    if (timerRef.current) {
      timerRef.current.stop();  // Stoppa timern om den är igång
      setDisplayTime('00:00:00');  // Återställ visningen till noll
    }
  };

  return (
    <div>
      <h2>Countdown Timer</h2>
      <div>
        <label>
          Hours:
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            min="0"
            placeholder="Hours"
          />
        </label>
      </div>

      <div>
        <label>
          Minutes:
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            min="0"
            max="59"
            placeholder="Minutes"
          />
        </label>
      </div>

      <div>
        <label>
          Seconds:
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
            min="0"
            max="59"
            placeholder="Seconds"
          />
        </label>
      </div>

      <div>
        <h3>{displayTime}</h3>
      </div>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Reset</button>
      </div>
    </div>
  );
}

export default CountdownTimer;
