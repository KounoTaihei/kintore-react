import { useState } from 'react';
import { useTimer } from 'use-timer';
import './App.scss';
import { Timer } from '../types/types';

function App() {
  const { time, start, pause, reset, status } = useTimer();
  const [ currentTimer, setCurrentTimer ] = useState<Timer | null>(null);

  function start_timer () {
    const training = () => {}
    const rest = () => {}
  }

  return (
    <div className="App">
      <div>
            <div>
                <button onClick={start}>Start</button>
                <button onClick={pause}>Pause</button>
                <button onClick={reset}>Reset</button>
            </div>
            <p>Elapsed time: {time}</p>
            {status === 'RUNNING' && <p>Running...</p>}
      </div>
    </div>
  );
}

export default App;
