import { useEffect, useState, useRef } from 'react';
import './assets/App.css';
import picture from './assets/picture.jpg'
import waldo from './assets/waldo.png'
import odlaw from './assets/odlaw.png'
import wizard from './assets/wizard.png'
import Dropdown from './components/Dropdown';

function App() {
  const [clicked, setClicked] = useState(false);
  const [xCoord, setXcoord] = useState(0);
  const [yCoord, setYcoord] = useState(0);
  const gamePicture = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (gamePicture.current && gamePicture.current !== e.target) {
        setClicked(false)
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [gamePicture]);

  const onClick = (e) => {
    setClicked(true)
    setXcoord(e.nativeEvent.offsetX)
    setYcoord(e.nativeEvent.offsetY)
  }

  return (
    <div className="App">
      <div className='header'>
        <p>Where's Waldo?</p>
      </div>
      <div className='findBlock'>
        <p id="findText">Characters to find:</p>
        <img src={waldo} alt="Waldo"></img>
        <img src={odlaw} alt="Odlaw"></img>
        <img src={wizard} alt="Wizard"></img>
      </div>
      {clicked ? 
        <div className="gamePictureWrapper">
          <img 
            ref={gamePicture}
            id="gamePicture"
            src={picture} 
            alt="where's waldo?"
            onClick={onClick}
          >
          </img>
          <Dropdown x={xCoord} y={yCoord}/>
        </div>
      :
        <div className="gamePictureWrapper">
          <img 
            ref={gamePicture}
            id="gamePicture"
            src={picture} 
            alt="where's waldo?"
            onClick={onClick}
          >
          </img>
        </div>
      }
    </div>
  );
}

export default App;
