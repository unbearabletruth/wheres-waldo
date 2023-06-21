import { useState } from "react";
import { db, writeResultToLeaderboard } from "../firebaseConnection";

const Popup = ({time, handlePopup}) => {
  const [input, setInput] = useState("");
  
  const handleChange = (e) =>{
    setInput(e.target.value)
  }

  const handleCancel = () => {
    handlePopup()
  }

  const handleResult = (e) => {
    e.preventDefault();
    writeResultToLeaderboard(db, input, time)
    handlePopup()
  }

  return(
    <div className="popupWrapper">
      <p className="time">
        You finished in<br/>
        {Math.floor((time % 6000) / 100).toString()}.
        {(time % 100).toString().padStart(2, "0")}&nbsp;
        seconds!
      </p>
      <form id="popupForm" onSubmit={handleResult}>
        <div className="popupInputBlock">
          <label id="popupLabel">Enter your name </label>
          <input 
            id="popupInput" 
            type="text" 
            onChange={handleChange} required
          >
          </input>
        </div>
        <div className="popupButtons">
          <button 
            id="popupCancel"
            className="popupButton" 
            type="button" 
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button 
            className="popupButton" 
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Popup;