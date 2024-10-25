// import React, { useState, useRef } from 'react';
// import './App.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LoadingScreen from './loading';
// import SetTimer from './setTimer';
// import Digital from './digital';
// import Analog from './analog';
// import Alarm from './alarm';
// import Timer from 'easytimer.js'; // Importera easytimer.js

// function App() {
//   const [timerSettings, setTimerSettings] = useState(null);
//   const timerRef = useRef(null); // Skapa en gemensam timerinstans med useRef

//   const startTimer = (settings) => {
//     if (!timerRef.current) {
//       timerRef.current = new Timer(); // Initiera timern om den inte redan finns
//     }

//     timerRef.current.start({
//       countdown: true,
//       startValues: settings,
//     });

//     setTimerSettings(settings); // Spara timerinställningarna
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/loading" element={<LoadingScreen />} />
//         <Route path="/" element={<LoadingScreen />} />
//         <Route
//           path="/set-timer"
//           element={<SetTimer setTimerSettings={startTimer} />}
//         />
//         <Route
//           path="/digital"
//           element={<Digital timer={timerRef.current} />} // Passa vidare timerinstansen
//         />
//         <Route
//           path="/analog"
//           element={<Analog timer={timerRef.current} />} // Passa vidare timerinstansen
//         />
//         <Route path="/alarm" element={<Alarm />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React, { useState, useRef } from 'react';
// import './App.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LoadingScreen from './loading';
// import SetTimer from './setTimer';
// import Digital from './digital';
// import Analog from './analog';
// import Alarm from './alarm';
// import Timer from 'easytimer.js'; // Importera easytimer.js
// import MenuButton from './menuButton';

// function App() {
//   const [timerSettings, setTimerSettings] = useState(null);
//   const timerRef = useRef(null);

//   const startTimer = (settings) => {
//     if (!timerRef.current) {
//       timerRef.current = new Timer();
//     }
//     timerRef.current.start({
//       countdown: true,
//       startValues: settings,
//     });
//     setTimerSettings(settings);
//   };

//   return (
//     <div className="container"> {/* Allt innehåll är inom en container */}
//       <Router>
//         <MenuButton /> {/* Menyknappen visas alltid */}
//         <Routes>
//           <Route path="/loading" element={<LoadingScreen />} />
//           <Route path="/" element={<LoadingScreen />} />
//           <Route path="/set-timer" element={<SetTimer setTimerSettings={startTimer} />} />
//           <Route path="/digital" element={<Digital timer={timerRef.current} />} />
//           <Route path="/analog" element={<Analog timer={timerRef.current} />} />
//           <Route path="/alarm" element={<Alarm />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

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
