import React, { useEffect, useRef } from "react"
import { string, func } from "prop-types"
import "./style.scss"

const VideoPlayer = ({ videoPoster, videoSrc, onClose }) => {
  const videoRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) onClose()
  }

  const handleClick = (e) => {
    if (!videoRef.current?.contains(e.target)) {
      onClose()
    }
  }

  const handleVideoLoadError = () => {
    console.log("error")
  }

  const toggleBodyScroll = (disable = true) => {
    const bodyDOM = document.querySelector("body")
    if (disable) {
      bodyDOM.classList.add("app-body--disable-scroll")
    } else {
      bodyDOM.classList.remove("app-body--disable-scroll")
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("click", handleClick)
    toggleBodyScroll(true)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("click", handleClick)
      videoRef.current?.removeAttribute("src")
      toggleBodyScroll(false)
    }
  }, [])

  return (
    <div className="gif-video__overlay">
      <div className="video__container">
        <video
          controls
          autoPlay
          src={videoSrc}
          type="video/mp4"
          poster={videoPoster}
          ref={videoRef}
          onError={handleVideoLoadError}
        />
      </div>
      <span className="gif-video__overlay__close" onClick={onClose}>
        Close
      </span>
    </div>
  )
}

VideoPlayer.propTypes = {
  videoPoster: string,
  videoSrc: string,
  onClose: func,
}

VideoPlayer.defaultProps = {
  videoPoster: "",
  videoSrc: "",
  onClose: () => null,
}

export default VideoPlayer
