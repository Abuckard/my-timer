
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styling/alarm.css';

function Alarm({ timer }) {
  const navigate = useNavigate();

  const handleStopTimer = () => {
    if (timer) {
      timer.stop();
      timer.removeEventListener('secondsUpdated', () => {}); // Ta bort alla eventlyssnare
      timer.removeEventListener('targetAchieved', () => {});
    }
    navigate('/set-timer');
  };

  return (
    <div className="alarm-container">
      <h2>Alarm Triggered!</h2>
      <div className="alarm-clock">⏰</div>
      <button className="stop-button-alarm" onClick={handleStopTimer} style={{ marginLeft: '10px' }}>Stop Alarm</button>
    </div>
  );
}

export default Alarm;
