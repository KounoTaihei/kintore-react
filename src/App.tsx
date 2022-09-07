import { useEffect, useRef, useState } from 'react';
import './App.scss';
import { Timer } from '../types/types';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import useInterval from './hooks/interval';
import { Button } from '@mui/material';

const exampleTimer: Timer = {
  training: 20,
  rest: 10,
  repeat: 3
}

function App() {
  const [ currentTimer, setCurrentTimer ] = useState<Timer | null>(exampleTimer);

  const [ elapsedTime, setElapsedTime ] = useState<number>(0);

  const interval = useInterval(() => {
    setElapsedTime(elapsedTime + 0.25);
  }, 250, false);

  return (
    <div className="p-8">
      <CircularProgressbar
        maxValue={1}
        value={elapsedTime / currentTimer?.training!}
        text="65"
        strokeWidth={6}
        styles={buildStyles({
          pathColor: "pink",
          textColor: "pink",
        })}
      />
      <Button onClick={interval[1].start}>start</Button>
      <Button onClick={interval[1].stop}>stop</Button>
      elapsedTime: {Math.floor(elapsedTime)}
    </div>
  );
}

export default App;
