import React from "react"
import { bool } from "prop-types"

import "./style.scss"

const Loader = ({ isBottomLoader }) => {
  return (
    <div
      className={`loader__full ${
        (isBottomLoader && "loader__full--bottom") || ""
      }`}
    >
      <div className="loader__full__spinner" />
    </div>
  )
}

Loader.propTypes = {
  isBottomLoader: bool,
}

Loader.defaultProps = {
  isBottomLoader: false,
}

export default Loader
