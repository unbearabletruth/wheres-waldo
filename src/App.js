import { useEffect, useState, useRef } from 'react';
import './assets/App.css';
import picture from './assets/picture.jpg'
import waldo from './assets/waldo.png'
import odlaw from './assets/odlaw.png'
import wizard from './assets/wizard.png'

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
      <div>
        <img src={waldo} alt="Waldo"></img>
        <img src={odlaw} alt="Odlaw"></img>
        <img src={wizard} alt="Wizard"></img>
      </div>
      <div>
      {clicked ? 
          <>
            <div className="gamePictureWrapper">
              <img 
                ref={gamePicture}
                id="gamePicture"
                src={picture} 
                alt="where's waldo?"
                onClick={onClick}
              >
              </img>
              <div 
                id='dropDownMenu'
                style={{left: xCoord - 30, top: yCoord - 30}}
              >
                <div id="targetBox">
                </div>
                <div className='variants'>
                  <div id="Waldo">
                    Waldo
                  </div>
                  <div id="Wilma">
                    Wilma
                  </div>
                  <div id="Wizard">
                    Wizard
                  </div>
                </div>
              </div>
            </div>
          </>
        :
          <div className="App">
            <img 
              src={picture} 
              alt="where's waldo?"
              onClick={onClick}
            >
            </img>
          </div>
      }
      </div>
    </div>
  );
}

export default App;
