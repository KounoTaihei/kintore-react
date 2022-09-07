import { useEffect, useState } from 'react';
import './App.scss';
import { Timer } from '../types/types';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const exampleTimer: Timer = {
  training: 20,
  rest: 10,
  repeat: 3
}

function App() {
  const [ currentTimer, setCurrentTimer ] = useState<Timer | null>(exampleTimer);

  return (
    <div className="p-8">
      <CircularProgressbar
        maxValue={1}
        value={6 / 20}
        text="65"
        strokeWidth={6}
        styles={buildStyles({
          pathColor: "pink",
          textColor: "pink",
        })}
      />
    </div>
  );
}

export default App;
