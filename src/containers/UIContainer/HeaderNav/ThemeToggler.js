import React, { useState, useEffect } from "react"
import Toggle from "components/Toggle"

import {
  getLocalStorageDarkTheme,
  setLocalStorageDarkTheme,
} from "utils/helpers"

const isLocalStorageDarkMode = getLocalStorageDarkTheme()

const ThemeToggler = () => {
  const [isDarkMode, toggleDarkMode] = useState(isLocalStorageDarkMode)
  const handleThemeToggle = () => toggleDarkMode((prevTheme) => !prevTheme)

  useEffect(() => {
    const bodyDOM = document.querySelector("body")
    if (isDarkMode) {
      bodyDOM.classList.remove("app-body--white-mode")
    } else {
      bodyDOM.classList.add("app-body--white-mode")
    }
    setLocalStorageDarkTheme(isDarkMode)
  }, [isDarkMode])

  return <Toggle isChecked={isDarkMode} onChange={handleThemeToggle} />
}

export default ThemeToggler
