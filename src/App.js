// import './App.css';


// function App() {
//   var timer = new Timer();
// timer.start();

// timer.addEventListener('secondsUpdated', function (e) {
//     $('#basicUsage').html(timer.getTimeValues().toString());
// });
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//         <div id="basicUsage">00:00:00</div>
//         </p>
//        </header>
//     </div>
//   );
// }

// export default App;

import './App.css';
import { Timer } from './timerCode/clockCode';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [time, setTime] = useState('00:00:00');
  const timerRef = useRef(null); // Skapa en referens för Timer-instansen

  useEffect(() => {
    timerRef.current = new Timer(); // Initiera Timer och spara den i ref

    // Stoppa timern om den startas automatiskt vid initiering
    timerRef.current.stop(); 

    // Lyssna på när sekunderna uppdateras
    timerRef.current.addEventListener('secondsUpdated', function () {
      setTime(timerRef.current.getTimeValues().toString());
    });

    // Cleanup the timer when the component unmounts
    return () => {
      timerRef.current.stop();
    };
  }, []);

  const handleReset = () => {
    timerRef.current.stop(); // Stoppa timern
    setTime('00:00:00'); // Sätt tiden manuellt till "00:00:00"
    // Vi använder inte timerRef.current.reset() eftersom det startar timern automatiskt
  };

  return (
    <div className="App">
      <div id="basicUsage">{time}</div>
      <div>
        <button onClick={() => timerRef.current.start()}>Start</button>
        <button onClick={() => timerRef.current.pause()}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;




