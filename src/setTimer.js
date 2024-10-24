// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './styling/setTimer.css';

// function SetTimer({ setTimerSettings }) {
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);
//   const navigate = useNavigate();

//   const handleSubmit = () => {
//     setTimerSettings({ hours, minutes, seconds });  // Skicka timerinställningarna till App.js
//     navigate('/digital');  // Navigera till Digital vy som standard
//   };

//   return (
//     <div>
//       <h2>Set Timer</h2>
//       <div className="set-timer-form">
//         <label className='set-timer-hours'>
//           Hours:
//           <input type="number" className='set-timer-hours-input' value={hours} onChange={(e) => setHours(Number(e.target.value))} />
//         </label>
//         <label className='set-timer-minutes'>
//           Minutes:
//           <input type="number" className='set-timer-minutes-input' value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} />
//         </label>
//         <label className='set-timer-seconds'>
//           Seconds:
//           <input type="number" className='set-timer-seconds-input' value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} />
//         </label>
//       </div>
//       <button onClick={handleSubmit}>Start Timer</button>
//     </div>
//   );
// }

// export default SetTimer;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function SetTimer({ setTimerSettings }) {
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);
//   const [isInterval, setIsInterval] = useState(false); // Checkbox för intervall
//   const [includePause, setIncludePause] = useState(false); // Checkbox för paus
//   const navigate = useNavigate();

//   const handleStartTimer = () => {
//     const timerSettings = {
//       hours,
//       minutes,
//       seconds,
//       isInterval,
//       includePause,
//     };
//     setTimerSettings(timerSettings); // Skicka timerinställningar till Digital.js
//     navigate('/digital'); // Navigera till Digital-timern
//   };

//   return (
//     <div>
//       <h2>Set Timer</h2>

//       {/* Användaren anger timern */}
//       <label>
//         Hours:
//         <input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
//       </label>
//       <br />
//       <label>
//         Minutes:
//         <input type="number" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} />
//       </label>
//       <br />
//       <label>
//         Seconds:
//         <input type="number" value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} />
//       </label>
//       <br />

//       {/* Checkbox för intervall */}
//       <div>
//         <input
//           type="checkbox"
//           id="interval"
//           checked={isInterval}
//           onChange={(e) => setIsInterval(e.target.checked)}
//         />
//         <label htmlFor="interval">Repeat Timer in Intervals</label>
//       </div>

//       {/* Checkbox för paus */}
//       <div>
//         <input
//           type="checkbox"
//           id="pause"
//           checked={includePause}
//           onChange={(e) => setIncludePause(e.target.checked)}
//         />
//         <label htmlFor="pause">Include 5-minute pause between intervals</label>
//       </div>

//       <button onClick={handleStartTimer}>Start Timer</button>
//     </div>
//   );
// }

// export default SetTimer;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styling/setTimer.css';  // Importera CSS-filen

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

    // Skicka timerinställningar till Digital.js (eller en annan komponent)
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

      {/* Användaren anger timern */}
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

      {/* Checkbox för intervall */}
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

        {/* Checkbox för paus */}
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

