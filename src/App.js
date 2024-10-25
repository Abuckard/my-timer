import React, { useState, useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingScreen from './loading';
import SetTimer from './setTimer';
import Digital from './digital';
import Analog from './analog';
import Alarm from './alarm';
import Texttimer from './text';
import MenuButton from './menuButton'; 
import Timer from 'easytimer.js';
import Pause from './pause';

function App() {
  const [timerSettings, setTimerSettings] = useState(null);
  const timerRef = useRef(null);

  const startTimer = (settings) => {
    if (!timerRef.current) {
      timerRef.current = new Timer();
    }
    setTimerSettings(settings); 
  };
  

  return (
    <div className="container">
      <Router>
        <MenuButton />
        <Routes>
          <Route path="/loading" element={<LoadingScreen />} />
          <Route path="/" element={<LoadingScreen />} />
          <Route path="/set-timer" element={<SetTimer setTimerSettings={startTimer} />} />
          <Route path="/digital" element={<Digital timer={timerRef.current} timerSettings={timerSettings} />} />
          <Route path="/analog" element={<Analog timer={timerRef.current} timerSettings={timerSettings} />} />
          <Route path="/text" element={<Texttimer timer={timerRef.current} timerSettings={timerSettings} />} />
          <Route path="/pause" element={<Pause timer={timerRef.current} timerSettings={timerSettings} />} />
          <Route path="/alarm" element={<Alarm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
