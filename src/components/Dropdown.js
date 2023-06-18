function Dropdown({x, y, handleSelected}) {
  return (
      <div 
        id='dropDownMenu'
        style={{left: x - 30, top: y - 30}}
      >
        <div id="targetBox">
        </div>
        <div className='variants'>
          <div id="Waldo" onClick={handleSelected}>
            Waldo
          </div>
          <div id="Odlaw" onClick={handleSelected}>
            Odlaw
          </div>
          <div id="Wizard" onClick={handleSelected}>
            Wizard
          </div>
        </div>
      </div>
  )
}

export default (Dropdown);