/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "./@components/ui/button";
import { TableTime } from "./@components/table";
import { v4 as uuidv4 } from 'uuid';
import { formatTime } from "./utils/formatted";


interface TimeProps {
  id: string
  time: string
}

export function App() {
  const [time, settime] = useState(0);
  const [running, setRunning] = useState(false);
  const [savedTimes, setSavedTimes] = useState<TimeProps[]>([]);

  useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => {
        settime((prevtime) => prevtime + 1);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleStart = () => {
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
    const formattedTime = formatTime(time);
    setSavedTimes([...savedTimes, {id: uuidv4(), time: formattedTime}]);

  };

  const handleDelete = (id: string) => {
    
    const result = savedTimes.filter((time) => time.id !== id);
    setSavedTimes(result);
  };

  const handleReset = () => {
    setRunning(false);
    settime(0);
  };

  const timeToMilliseconds = (timeString: string) => {
    const [minutes, seconds, milliseconds] = timeString
      .split(':')
      .map(part => parseInt(part, 10));
    return minutes * 60 * 1000 + seconds * 1000 + milliseconds;
  };

  const sumTimes = () => {
    const totalMilliseconds = savedTimes.reduce((accumulator, currentValue) => {
      return accumulator + timeToMilliseconds(currentValue.time);
    }, 0);
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    const milliseconds = ((totalMilliseconds % 100) / 1).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-bold">{formatTime(time)}</h1>
        <div className="flex gap-3 mt-5">
          <Button
            className="text-zinc-50 bg-emerald-500 font-semibold"
            onClick={handleStart}
          >
            Iniciar
          </Button>
          <Button
            className="text-zinc-50 bg-yellow-500 font-semibold"
            onClick={handleStop}
          >
            Pausar
          </Button>
          <Button
            className="text-zinc-50 bg-purple-500 font-semibold"
            onClick={handleReset}
          >
            Reiniciar
          </Button>
        </div>
        <TableTime timeData={savedTimes} deleteTime={handleDelete} sumTimes={sumTimes}/>
       
      </div>
    </div>
  );
}
