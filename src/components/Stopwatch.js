import React, { useState, useEffect } from "react";
import Popup from "./Popup";

const Stopwatch = ({start, finish}) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [popupState, setPopupState] = useState(false)

  const handlePopup = () => {
    setPopupState(!popupState)
  }

  useEffect(() => {
    if(start === true || finish === true){
      setIsRunning(!isRunning);
    }
    if(finish === true){
      setPopupState(!popupState);
    }
  },[start, finish])

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  return popupState ? <Popup time={time} handlePopup={handlePopup}/> : null
};


export default Stopwatch;