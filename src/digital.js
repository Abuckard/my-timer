import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styling/digital.css';  

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

  // Här läser vi av om timern ska starta på nytt, pausas eller om alarmet ska gå igång
  const handleTimerEnd = () => {
    if (timerSettings.isInterval) {
      if (timerSettings.includePause) {
        // Navigera till paussidan om "includePause" är aktiverat
        navigate('/pause');
      } else {
        // Starta nästa intervall direkt utan paus
        startNextInterval();
      }
    } else {
      navigate('/alarm');
    }
  };

  // Starta nästa intervall med samma startvärden
  const startNextInterval = () => {
    timer.start({
      countdown: true,
      startValues: {
        hours: timerSettings.hours,
        minutes: timerSettings.minutes,
        seconds: timerSettings.seconds,
      },
    });
    timer.addEventListener('targetAchieved', handleTimerEnd);
  };

  // Funktion för att stoppa timern och navigera tillbaka till "Set Timer", finns säkert ett bättre sätt att göra det på men det här va det enda jag kom på.
  const handleStopTimer = () => {
    if (timer) {
      timer.stop(); 
    }
    navigate('/set-timer');
  };

  return (
    <div className="digital-timer-container">
      <h2 className="digital-title">Digital Timer</h2>
      <div className="timer-display">{displayTime}</div>
      <div className="emoji-display">
      <span role="img" aria-label="emoji1" className="emoji">✋</span>
      <span role="img" aria-label="emoji2" className="emoji">🖐</span>
      <span role="img" aria-label="emoji3" className="emoji">🖖</span>
      </div>
      <button className="stop-button" onClick={handleStopTimer}>Stop</button>
    </div>
  );
}

export default Digital;
