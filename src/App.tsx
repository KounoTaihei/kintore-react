import { useState } from 'react';
import { Timer } from './types/types';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import useInterval from './hooks/interval';
import { Button } from '@mui/material';
import { drawing_duration, themeColor } from './data/data';
import three_seconds_sound from './audio/3seconds.mp3';
import finished_sound from './audio/finished.mp3';
import clock_sound from './audio/clock.mp3';
import useSound from 'use-sound';

const exampleTimer: Timer = {
  training: 10,
  rest: 5,
  repeat: 3
}

function App() {
  const [ currentTimer, setCurrentTimer ] = useState<Timer | null>(exampleTimer);

  const [ elapsedTime, setElapsedTime ] = useState<number>(0);
  const [ trainingState, setTrainingState ] = useState<'training' | 'resting'>('training');
  const [ repeated, setRepeated ] = useState<number>(0);

  const [ play_three_seconds_sound ] = useSound(three_seconds_sound);
  const [ play_finished_sound ] = useSound(finished_sound);
  const [ play_clock_sound ] = useSound(clock_sound);

  const interval = useInterval(() => {
    /** トレーニング中 */
    if(trainingState === 'training') {
      setElapsedTime(elapsedTime + drawing_duration / 1000);

      /** 整数秒の時に時計の音を鳴らす */
      if(Number.isInteger(currentTimer?.training! - elapsedTime) && elapsedTime !== 0) {
        if(currentTimer?.training! - elapsedTime >= 1) {
          play_clock_sound();
          console.log(elapsedTime, 'clock_sound played');

          /** 3秒前のみ鈴の音 */
          if(currentTimer?.training! - elapsedTime === 3) {
            play_three_seconds_sound();
            console.log(elapsedTime, '3 seconds left');
          }
        }
      }

      if(elapsedTime === currentTimer?.training!) {
        play_finished_sound();

        /** 繰り返し回数が全て終わったら止める */
        if(repeated === currentTimer?.repeat! - 1) {
          console.log('all done');
          interval[1].stop();
        }
        else {
          console.log('tarining done');
          setElapsedTime(0);
          setTrainingState('resting');
        }
      }
    }
    /** 休憩中 */
    else if(trainingState === 'resting') {
      setElapsedTime(elapsedTime + drawing_duration / 1000);

      /** 整数秒の時に時計の音を鳴らす */
      if(Number.isInteger(currentTimer?.rest! - elapsedTime) && elapsedTime !== 0) {
        if(currentTimer?.rest! - elapsedTime >= 1) {
          play_clock_sound();
          console.log(elapsedTime, 'clock_sound played');

          /** 3秒前のみ鈴の音 */
          if(currentTimer?.rest! - elapsedTime === 3) {
            play_three_seconds_sound();
            console.log(elapsedTime, '3 seconds left');
          }
        }
      }

      /** 休憩の秒数が終わったらトレーニングに戻す */
      if(elapsedTime === currentTimer?.rest!) {
        play_finished_sound();
        console.log('resting done');
        setRepeated(repeated + 1);
        setElapsedTime(0);
        setTrainingState('training');
      }
    }
  },
    drawing_duration,
    false
  );

  return (
    <div className="p-4">
      <CircularProgressbar
        className='p-6'
        maxValue={1}
        value={trainingState === 'training' ? elapsedTime / currentTimer?.training! : elapsedTime / currentTimer?.rest!}
        text={trainingState === 'training' ? `${currentTimer?.training! - Math.floor(elapsedTime)}` : `${currentTimer?.rest! - Math.floor(elapsedTime)}`}
        strokeWidth={5}
        styles={buildStyles({
          textSize: '1.5rem',
          pathColor: themeColor,
          textColor: themeColor,
        })}
      />
      <Button onClick={interval[1].start}>start</Button>
      <Button onClick={interval[1].stop}>stop</Button>
      <Button>reset</Button>
      <div>training state: {trainingState}</div>
      <div>elapsedTime: {Math.floor(elapsedTime)}</div>
      <div>repeated time: {repeated}</div>
    </div>
  );
}

export default App;
