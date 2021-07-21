import React, { useRef } from "react"
import { ToastContainer } from "react-toastify"

import HeaderNav from "containers/UIContainer/HeaderNav"
import GifItemsContainer from "containers/UIContainer/GifItemsContainer"

import "react-toastify/dist/ReactToastify.css"
import "./index.scss"

function App() {
  const appContainerRef = useRef(null)
  return (
    <div className="App" ref={appContainerRef}>
      <HeaderNav />
      <div className="gif-items__wrapper">
        <GifItemsContainer parentRef={appContainerRef} />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
      />
    </div>
  )
}

export default App
