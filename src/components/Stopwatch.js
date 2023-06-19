import React, { useState, useEffect } from "react";

const Stopwatch = ({start, finish}) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if(start === true || finish === true){
      setIsRunning(!isRunning);
    }
  },[start, finish])

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  return (
    <div className="stopwatchWrapper">
      <p className="stopwatch">
        {Math.floor((time % 360000) / 6000).toString().padStart(2, "0")}:
        {Math.floor((time % 6000) / 100).toString().padStart(2, "0")}:
        {(time % 100).toString().padStart(2, "0")}
      </p>
    </div>
  );
};

export default Stopwatch;