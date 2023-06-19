import { useState } from "react";
import { db, writeResultToLeaderboard } from "../firebaseConnection";

const Popup = ({time}) => {
  const [input, setInput] = useState("");

  const handleChange = (e) =>{
    setInput(e.target.value)
  }

  const handleResult = () => {
    writeResultToLeaderboard(db, input, time)
  }

  return(
    <div className="popupWrapper">
      <p className="time">
        You finished in:
        {Math.floor((time % 360000) / 6000).toString().padStart(2, "0")}:
        {Math.floor((time % 6000) / 100).toString().padStart(2, "0")}:
        {(time % 100).toString().padStart(2, "0")}
      </p>
      <label>Your name</label>
      <input type="text" onChange={handleChange}></input>
      <button>Cancel</button>
      <button onClick={handleResult}>Submit</button>
    </div>
  )
}

export default Popup;