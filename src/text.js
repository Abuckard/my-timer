import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styling/textTimer.css';

// Funktion för att konvertera siffror till ord
const numberToWords = (num) => {
  const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
    'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five', 'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine',
    'thirty', 'thirty-one', 'thirty-two', 'thirty-three', 'thirty-four', 'thirty-five', 'thirty-six', 'thirty-seven', 'thirty-eight', 'thirty-nine',
    'forty', 'forty-one', 'forty-two', 'forty-three', 'forty-four', 'forty-five', 'forty-six', 'forty-seven', 'forty-eight', 'forty-nine',
    'fifty', 'fifty-one', 'fifty-two', 'fifty-three', 'fifty-four', 'fifty-five', 'fifty-six', 'fifty-seven', 'fifty-eight', 'fifty-nine'];

  return words[num] || '';
};

function Texttimer({ timer, timerSettings }) {
  const [timeValues, setTimeValues] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (timer) {
      // Lyssna på när sekunder uppdateras
      timer.addEventListener('secondsUpdated', () => {
        const timeValues = timer.getTimeValues();
        setTimeValues({
          hours: timeValues.hours,
          minutes: timeValues.minutes,
          seconds: timeValues.seconds,
        });
      });

      // Hantera när timern når noll
      timer.addEventListener('targetAchieved', handleTimerEnd);
    }

    return () => {
      timer.removeEventListener('secondsUpdated');
      timer.removeEventListener('targetAchieved');
    };
  }, [timer, timerSettings]);


  // Här läser vi av om timern ska starta på nytt, pausas eller om alarmet ska gå igång
  const handleTimerEnd = () => {
    if (timerSettings.isInterval) {
      if (timerSettings.includePause) {
        // Navigera till paussidan om paus är aktiverad
        navigate('/pause');
      } else {
        // Starta nästa intervall direkt
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

  const handleStopTimer = () => {
    if (timer) {
      timer.stop(); 
    }
    navigate('/set-timer');
  };

  // Konvertera timern till ord
  const hoursText = numberToWords(timeValues.hours);
  const minutesText = numberToWords(timeValues.minutes);
  const secondsText = numberToWords(timeValues.seconds);

  return (
    <div className="text-timer-container">
      <h2 className="text-timer-title">Text Timer</h2>
      <div className="text-timer-display">
        <h3>{hoursText} {timeValues.hours === 1 ? 'hour' : 'hours'}</h3>
        <h3>{minutesText} {minutesText === 'one' ? 'minute' : 'minutes'}</h3>
        <h3>{secondsText} {secondsText === 'one' ? 'second' : 'seconds'}</h3>
      </div>
      <button className="stop-button-text" onClick={handleStopTimer}>Stop Timer</button>
    </div>
  );
}

export default Texttimer;
