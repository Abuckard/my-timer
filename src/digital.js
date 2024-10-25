
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styling/digital.css';

function Digital({ timer, timerSettings }) {
  const [displayTime, setDisplayTime] = useState('00:00:00');
  const navigate = useNavigate();

  useEffect(() => {
    if (timer && timerSettings) {
      startOrRestartTimer();

      timer.addEventListener('secondsUpdated', updateDisplayTime);
      timer.addEventListener('targetAchieved', handleTimerEnd);
    }

    return () => {
      // Rensa eventlyssnare när komponenten avmonteras eller timern stoppas
      if (timer) {
        timer.removeEventListener('secondsUpdated', updateDisplayTime);
        timer.removeEventListener('targetAchieved', handleTimerEnd);
      }
    };
  }, [timer, timerSettings]);

  const startOrRestartTimer = () => {
    timer.stop();
    timer.start({
      countdown: true,
      startValues: {
        hours: timerSettings.hours,
        minutes: timerSettings.minutes,
        seconds: timerSettings.seconds,
      },
    });
  };

  const updateDisplayTime = () => {
    setDisplayTime(timer.getTimeValues().toString());
  };

  const handleTimerEnd = () => {
    if (timerSettings.isInterval) {
      if (timerSettings.includePause) {
        navigate('/pause');
      } else {
        startOrRestartTimer();
      }
    } else {
      navigate('/alarm');
    }
  };

  const handleStopTimer = () => {
    if (timer) {
      timer.stop();
      timer.removeEventListener('secondsUpdated', updateDisplayTime);
      timer.removeEventListener('targetAchieved', handleTimerEnd);
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
