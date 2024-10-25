import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styling/alarm.css';

function Alarm({ timer }) {
  const navigate = useNavigate();

  // Funktion för att stoppa timern och navigera tillbaka till "Set Timer"
  const handleStopTimer = () => {
    if (timer) {
      timer.stop(); 
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
