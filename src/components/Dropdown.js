import waldo from '../assets/optionWaldo.png'
import odlaw from '../assets/optionOdlaw.png'
import wizard from '../assets/optionWizard.png'

function Dropdown({x, y, handleSelected}) {
  return (
      <div 
        id='dropDownMenu'
        style={{left: x - 30, top: y - 30}}
      >
        <div id="targetBox">
          ?
        </div>
        <div className='variants'>
          <div id="Waldo" className="option" onClick={handleSelected}>
            <img src={waldo} alt='waldo' className='optionImg'></img>
            Waldo
          </div>
          <div id="Odlaw" className="option" onClick={handleSelected}>
            <img src={odlaw} alt='waldo' className='optionImg'></img>
            Odlaw
          </div>
          <div id="Wizard" className="option" onClick={handleSelected}>
            <img src={wizard} alt='waldo' className='optionImg'></img>
            Wizard
          </div>
        </div>
      </div>
  )
}

export default (Dropdown);