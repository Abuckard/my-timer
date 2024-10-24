// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Digital({ timer }) {
//   const [displayTime, setDisplayTime] = useState('00:00:00');
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (timer) {
//       // Uppdatera tiden när sekunder uppdateras
//       timer.addEventListener('secondsUpdated', () => {
//         setDisplayTime(timer.getTimeValues().toString());
//       });

//       // Hantera när nedräkningen når noll
//       timer.addEventListener('targetAchieved', () => {
//         navigate('/alarm'); // Navigera till Alarm när tiden är slut
//       });
//     }

//     // Rensa eventlyssnare vid avmontering
//     return () => {
//       timer.removeEventListener('secondsUpdated');
//       timer.removeEventListener('targetAchieved');
//     };
//   }, [timer, navigate]);

//   // Funktion för att stoppa timern och navigera tillbaka till "Set Timer"
//   const handleStopTimer = () => {
//     if (timer) {
//       timer.stop(); // Stoppa timern
//     }
//     navigate('/set-timer'); // Navigera tillbaka till "Set Timer"-sidan
//   };

//   return (
//     <div>
//       <h2>Digital Timer</h2>
//       <h3>{displayTime}</h3>
//       <button onClick={() => navigate('/analog')}>Switch to Analog</button>
//       <button onClick={handleStopTimer} style={{ marginLeft: '10px' }}>Stop Timer</button>
//     </div>
//   );
// }

// export default Digital;







// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Digital({ timer, timerSettings }) {
//   const [displayTime, setDisplayTime] = useState('00:00:00');
//   const navigate = useNavigate();

//   // Sätt standardvärden om timerSettings är undefined
//   const defaultSettings = {
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//     isInterval: false,
//     includePause: false,
//   };

//   const settings = timerSettings || defaultSettings;

//   useEffect(() => {
//     if (timer) {
//       // Starta timern med inställningarna från SetTimer
//       timer.start({
//         countdown: true,
//         startValues: {
//           hours: settings.hours,
//           minutes: settings.minutes,
//           seconds: settings.seconds,
//         },
//       });

//       // Uppdatera tiden när sekunder uppdateras
//       timer.addEventListener('secondsUpdated', () => {
//         setDisplayTime(timer.getTimeValues().toString());
//       });

//       // Hantera när nedräkningen når noll
//       timer.addEventListener('targetAchieved', handleTimerEnd);
//     }

//     // Rensa eventlyssnare vid avmontering
//     return () => {
//       timer.removeEventListener('secondsUpdated');
//       timer.removeEventListener('targetAchieved');
//     };
//   }, [timer, settings]);

//   // Funktion som anropas när timern når 0
//   const handleTimerEnd = () => {
//     if (settings.isInterval) {
//       if (settings.includePause) {
//         // Lägg till en 5-minuters paus innan nästa intervall startar
//         timer.start({
//           countdown: true,
//           startValues: { minutes: 5, seconds: 0 },  // Pausen på 5 minuter
//         });

//         // Lägg till en tillfällig eventlyssnare som startar nästa intervall efter pausen
//         const startIntervalAfterPause = () => {
//           startNextInterval();
//           timer.removeEventListener('targetAchieved', startIntervalAfterPause); // Ta bort lyssnaren efter användning
//         };

//         timer.addEventListener('targetAchieved', startIntervalAfterPause);

//       } else {
//         // Starta direkt nästa intervall
//         startNextInterval();
//       }
//     } else {
//       navigate('/alarm'); // Om intervall inte är aktiverat, gå till Alarm
//     }
//   };

//   // Starta nästa intervall med de ursprungliga värdena
//   const startNextInterval = () => {
//     timer.start({
//       countdown: true,
//       startValues: {
//         hours: settings.hours,
//         minutes: settings.minutes,
//         seconds: settings.seconds,
//       },
//     });

//     // Återaktivera targetAchieved för nästa gång
//     timer.addEventListener('targetAchieved', handleTimerEnd);
//   };

//   // Funktion för att stoppa timern och navigera tillbaka till "Set Timer"
//   const handleStopTimer = () => {
//     if (timer) {
//       timer.stop(); // Stoppa timern
//     }
//     navigate('/set-timer'); // Navigera tillbaka till "Set Timer"-sidan
//   };

//   return (
//     <div>
//       <h2>Digital Timer</h2>
//       <h3>{displayTime}</h3>
//       <button onClick={() => navigate('/analog')}>Switch to Analog</button>
//       <button onClick={handleStopTimer} style={{ marginLeft: '10px' }}>Stop Timer & Set Timer</button>
//     </div>
//   );
// }

// export default Digital;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styling/digital.css';  // Lägg till en ny CSS-fil för Digital-timern

function Digital({ timer, timerSettings }) {
  const [displayTime, setDisplayTime] = useState('00:00:00');
  const navigate = useNavigate();

  useEffect(() => {
    if (timer && timerSettings) {
      // Starta timern baserat på inställningarna från SetTimer
      timer.start({
        countdown: true,
        startValues: {
          hours: timerSettings.hours,
          minutes: timerSettings.minutes,
          seconds: timerSettings.seconds,
        },
      });

      // Uppdatera displayen när sekunderna uppdateras
      timer.addEventListener('secondsUpdated', () => {
        setDisplayTime(timer.getTimeValues().toString());
      });

      // Hantera när timern når noll
      timer.addEventListener('targetAchieved', handleTimerEnd);
    }

    return () => {
      // Rensa eventlyssnare när komponenten avmonteras
      if (timer) {
        timer.removeEventListener('secondsUpdated');
        timer.removeEventListener('targetAchieved');
      }
    };
  }, [timer, timerSettings]);

  // Hantera slutet av nedräkningen
  const handleTimerEnd = () => {
    if (timerSettings.isInterval) {
      if (timerSettings.includePause) {
        // Starta en 5-minuters paus innan nästa intervall
        timer.start({
          countdown: true,
          startValues: { minutes: 5, seconds: 0 },
        });

        // När pausen är klar, starta nästa intervall
        const startNextInterval = () => {
          timer.start({
            countdown: true,
            startValues: {
              hours: timerSettings.hours,
              minutes: timerSettings.minutes,
              seconds: timerSettings.seconds,
            },
          });
          timer.removeEventListener('targetAchieved', startNextInterval);
        };

        timer.addEventListener('targetAchieved', startNextInterval);
      } else {
        // Starta nästa intervall direkt
        timer.start({
          countdown: true,
          startValues: {
            hours: timerSettings.hours,
            minutes: timerSettings.minutes,
            seconds: timerSettings.seconds,
          },
        });
      }
    } else {
      navigate('/alarm');
    }
  };

  // Funktion för att stoppa timern och navigera tillbaka till "Set Timer"
  const handleStopTimer = () => {
    if (timer) {
      timer.stop(); // Stoppa timern om den körs
    }
    navigate('/set-timer'); // Navigera tillbaka till "Set Timer"-sidan
  };

  return (
    <div className="digital-timer-container">
      <h2 className="digital-title">Digital Timer</h2>
      <div className="timer-display">{displayTime}</div>
      <button className="stop-button" onClick={handleStopTimer}>Stop</button>
    </div>
  );
}

export default Digital;
