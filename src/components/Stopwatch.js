import React, { useState, useEffect } from "react";
import Popup from "./Popup";

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

  return finish ? <Popup time={time}/> : null
};


export default Stopwatch;