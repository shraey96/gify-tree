import React from "react"

import { bool, func } from "prop-types"

import "./style.scss"

const Toggle = ({ isChecked, onChange }) => {
  return (
    <div className="toggle__container">
      <input
        type="checkbox"
        id="switch"
        checked={isChecked}
        onChange={onChange}
      />
      <label htmlFor="switch">Toggle</label>
    </div>
  )
}

Toggle.propTypes = {
  isChecked: bool,
  onChange: func,
}

Toggle.defaultProps = {
  isChecked: false,
  onChange: () => null,
}

export default Toggle
