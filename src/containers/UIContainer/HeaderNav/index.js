import React from "react"

import SearchContainer from "./SearchNav"
import ThemeToggler from "./ThemeToggler"

import "./style.scss"

const HeaderNav = () => {
  return (
    <div className="header-nav__wrapper">
      <SearchContainer />
      <ThemeToggler />
    </div>
  )
}

export default HeaderNav
