import React, { useRef } from "react"

import SearchContainer from "containers/UIContainer/SearchContainer"
import GifItemsContainer from "containers/UIContainer/GifItemsContainer"

import "./index.scss"

function App() {
  const appContainerRef = useRef(null)
  return (
    <div className="App" ref={appContainerRef}>
      <div className="search-box__container">
        <SearchContainer />
      </div>
      <div className="gif-items__container">
        <GifItemsContainer parentRef={appContainerRef} />
      </div>
    </div>
  )
}

export default App
