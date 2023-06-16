function Dropdown({x, y}) {
  return (
      <div 
        id='dropDownMenu'
        style={{left: x - 30, top: y - 30}}
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
  )
}

export default (Dropdown);