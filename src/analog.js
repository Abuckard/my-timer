import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './styling/analog.css';  // Glöm inte att importera CSS-filen

function Analog({ timer, timerSettings }) {
  const [timeValues, setTimeValues] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const navigate = useNavigate();

  const defaultSettings = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    isInterval: false,
    includePause: false,
  };

  const settings = timerSettings || defaultSettings;

  useEffect(() => {
    if (timer) {
      timer.addEventListener('secondsUpdated', () => {
        const timeValues = timer.getTimeValues();
        setTimeValues({
          hours: timeValues.hours,
          minutes: timeValues.minutes,
          seconds: timeValues.seconds
        });
      });

      timer.addEventListener('targetAchieved', handleTimerEnd);
    }

    return () => {
      timer.removeEventListener('secondsUpdated');
      timer.removeEventListener('targetAchieved');
    };
  }, [timer, settings]);

  const handleTimerEnd = () => {
    if (settings.isInterval) {
      if (settings.includePause) {
        // Navigera till paussidan om paus är aktiverad
        navigate('/pause');
      } else {
        startNextInterval();
      }
    } else {
      navigate('/alarm');
    }
  };

  const startNextInterval = () => {
    timer.start({
      countdown: true,
      startValues: {
        hours: settings.hours,
        minutes: settings.minutes,
        seconds: settings.seconds,
      },
    });

    timer.addEventListener('targetAchieved', handleTimerEnd);
  };

  const handleStopTimer = () => {
    if (timer) {
      timer.stop();
    }
    navigate('/set-timer');
  };

  const hoursDegree = (timeValues.hours % 12) * 30 + (timeValues.minutes / 2) - 90; // Justera för kl. 12
  const minutesDegree = timeValues.minutes * 6 - 90; // Justera för kl. 12
  const secondsDegree = timeValues.seconds * 6 - 90; // Justera för kl. 12

  return (
    <div className="analog-clock-container">
      <h2>Analog Timer</h2>
      <div className="clock">
          <motion.div
            className="hand hour-hand"
            animate={{ rotate: hoursDegree }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <motion.div
            className="hand minute-hand"
            animate={{ rotate: minutesDegree }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <motion.div
            className="hand second-hand"
            animate={{ rotate: secondsDegree }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          {/* Lägg till en cirkel i mitten */}
          <div className="center-circle"></div>
      </div>
      <div className="stop-button-container">
        <button className="stop-button-analog" onClick={handleStopTimer} style={{ marginLeft: '10px' }}>Stop</button>
      </div>
    </div>
  );
}

export default Analog;
