import { useEffect, useRef, useState } from 'react';
import './App.scss';
import { Timer } from '../types/types';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import useInterval from './hooks/interval';
import { Button } from '@mui/material';

const exampleTimer: Timer = {
  training: 5,
  rest: 3,
  repeat: 3
}

function App() {
  const [ currentTimer, setCurrentTimer ] = useState<Timer | null>(exampleTimer);

  const [ elapsedTime, setElapsedTime ] = useState<number>(0);
  const [ trainingState, setTrainingState ] = useState<'training' | 'resting'>('training');
  const [ repeated, setRepeated ] = useState<number>(0);

  const interval = useInterval(() => {
    if(trainingState === 'training') {
      setElapsedTime(elapsedTime + 0.25);
      if(elapsedTime === currentTimer?.training!) {
        if(repeated === currentTimer?.repeat! - 1) {
          console.log('all done');
          interval[1].stop();
        } else {
          console.log('tarining done');
          setElapsedTime(0);
          setTrainingState('resting');
        }
      }
    } else if(trainingState === 'resting') {
      setElapsedTime(elapsedTime + 0.25);
      if(elapsedTime === currentTimer?.rest!) {
        console.log('resting done');
        setRepeated(repeated + 1);
        setElapsedTime(0);
        setTrainingState('training');
      }
    }
  },
    250,
    false
  );

  return (
    <div className="p-8">
      <CircularProgressbar
        maxValue={1}
        value={trainingState === 'training' ? elapsedTime / currentTimer?.training! : elapsedTime / currentTimer?.rest!}
        text={trainingState === 'training' ? `${currentTimer?.training! - Math.floor(elapsedTime)}` : `${currentTimer?.rest! - Math.floor(elapsedTime)}`}
        strokeWidth={6}
        styles={buildStyles({
          pathColor: "pink",
          textColor: "pink",
        })}
      />
      <Button onClick={interval[1].start}>start</Button>
      <Button onClick={interval[1].stop}>stop</Button>
      <div>training state: {trainingState}</div>
      <div>elapsedTime: {Math.floor(elapsedTime)}</div>
      <div>repeated time: {repeated}</div>
    </div>
  );
}

export default App;
