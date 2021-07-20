import React from "react"

import { string, func } from "prop-types"

import "./style.scss"

const SearchBox = React.forwardRef(
  ({ type, placeholder, value, onChange, onBlur, onFocus }, ref) => {
    return (
      <div className="input-box__container">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </div>
    )
  }
)

SearchBox.propTypes = {
  type: string,
  placeholder: string,
  value: string,
  onChange: func,
  onBlur: func,
  onFocus: func,
}

SearchBox.defaultProps = {
  type: "text",
  value: "",
  placeholder: "Search for something...",
  onChange: () => null,
  onBlur: () => null,
  onFocus: () => null,
}

export default SearchBox
