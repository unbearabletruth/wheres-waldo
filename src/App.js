import { useEffect, useState, useRef } from 'react';
import './assets/App.css';
import picture from './assets/picture.jpg'
import waldo from './assets/waldo.png'
import odlaw from './assets/odlaw.png'
import wizard from './assets/wizard.png'
import Dropdown from './components/Dropdown';
import Stopwatch from './components/Stopwatch';
import Leaderboard from './components/Leaderboard';
import {db, getCharacters} from './firebaseConnection';
import uniqid from "uniqid";

function App() {
  const [characters, setCharacters] = useState([
    {name: "Waldo", image: waldo, found: false, id: uniqid()},
    {name: "Wizard", image: wizard, found: false, id: uniqid()},
    {name: "Odlaw", image: odlaw, found: false, id: uniqid()}
  ])
  const [selected, setSelected] = useState("");
  const [clicked, setClicked] = useState(false);
  const [xCoord, setXcoord] = useState(0);
  const [yCoord, setYcoord] = useState(0);
  const gamePicture = useRef(null);
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [found, setFound] = useState([]);
  const [wrongGuess, setWrongGuess] = useState(false);

  useEffect(() => {
    for (let char of characters){
      if (char.found === false){
        return
      }
    }
    setFinish(true)
  },[characters])

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
          setFound(found.concat({name: selected, x: xCoord, y: yCoord}));
        } else {
          setWrongGuess(true);
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
    setWrongGuess(false)
    setStart(true)
    setClicked(true)
    setXcoord(e.nativeEvent.offsetX)
    setYcoord(e.nativeEvent.offsetY)
  }

  const handleSelected = (e) => {
    setSelected(e.target.id);
  }

  const restart = () => {
    setCharacters(characters.map(char => 
      char.found === true ?
      {...char, found: false}
      : char
      ))
    setStart(false)
    setFinish(false)
    setFound([])
  }

  return (
    <div className="App">
      <div className='header'>
        <p>Where's Waldo?</p>
        <a href="#leaderboardCaption">Go to leaderboard</a>
      </div>
      <div className='findBlock'>
        <p id="findText">{!finish? "Where are they?" : "You found all!"}</p>
        {characters.map(char => {
          return(
            <div key={char.id} className='charStatusWrapper'>
              <img 
                src={char.image} 
                alt="Waldo" 
                className={char.found? "found" : null}
              >
              </img>
              <p 
                className={char.found ? "foundText" : null} 
                id='charStatusText'
              >
                {char.found ? "Found!" : "Find!"}
              </p>
            </div>
          )
        })}
        <p>{finish}</p>
        {wrongGuess ? <p id="wrongGuessText">Oh no, you missed!</p> : null}
        {finish ? <button id="restartButton" onClick={restart}>Play again!</button> : null}
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
          {found ?
            found.map(char => {
              return (
                <div 
                  key={uniqid()} 
                  className="foundMarker" 
                  style={{left: char.x - 25, top: char.y - 10}}
                >
                  {char.name}
                </div>
            )})
            : null
          }
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
          {found ?
            found.map(char => {
              return (
                <div 
                  key={uniqid()} 
                  className="foundMarker" 
                  style={{left: char.x - 25, top: char.y - 10}}
                >
                  {char.name}
                </div>
            )})
            : null
          }
        </div>
      }
      <Stopwatch start={start} finish={finish}/>
      <Leaderboard/>
    </div>
  );
}

export default App;
