import { useEffect, useState, useRef } from 'react';
import './assets/App.css';
import picture from './assets/picture.jpg'
import waldo from './assets/waldo.png'
import odlaw from './assets/odlaw.png'
import wizard from './assets/wizard.png'
import Dropdown from './components/Dropdown';
import {db, getCharacters} from './firebaseConnection';

function App() {
  const [characters, setCharacters] = useState([
    {name: "Waldo", image: waldo, found: false, id: 1},
    {name: "Wizard", image: wizard, found: false, id: 2},
    {name: "Odlaw", image: odlaw, found: false, id: 3}
  ])
  const [selected, setSelected] = useState("");
  const [clicked, setClicked] = useState(false);
  const [xCoord, setXcoord] = useState(0);
  const [yCoord, setYcoord] = useState(0);
  const gamePicture = useRef(null);

  useEffect(() => {
    if (selected !== ""){
      const coords = getCharacters(db, selected);
      async function compareCoords(){
        const charCoords = await coords;
        if ((charCoords.left <= xCoord && xCoord <= charCoords.right) &&
        (charCoords.top <= yCoord && yCoord <= charCoords.bottom)){
          setCharacters(characters.map(char => 
            char.name === selected ?
            {...char, found: true}
            : char
            ))
        } 
      }
      compareCoords()
      setSelected("")
    }
  }, [selected])
  
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

  const handleSelected = (e) => {
    setSelected(e.target.id);
  }
  console.log("render")
  return (
    <div className="App">
      <div className='header'>
        <p>Where's Waldo?</p>
      </div>
      <div className='findBlock'>
        <p id="findText">Characters to find:</p>
        {characters.map(char => {
          return(
              <img 
                key={char.id}
                src={char.image} 
                alt="Waldo" 
                className={char.found? "found" : null}
              >
              </img>
          )
        })}
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
          <Dropdown x={xCoord} y={yCoord} handleSelected={handleSelected}/>
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
