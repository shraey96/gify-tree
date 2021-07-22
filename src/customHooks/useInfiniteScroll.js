import React, { useEffect, useState } from "react"
import { debounce, throttle } from "../utils/helpers"

const useInfiniteScroll = ({
  scrollElement = window,
  throttleTimer = 0,
  debounceTimer = 0,
  bottomOffsetThresholdPercent = 100,
} = {}) => {
  const [isAtBottom, setIsAtBottom] = useState(false)

  const handleScroll = (e) => {
    const el = e.target.documentElement
    const scrollPercent = el.scrollTop / (el.scrollHeight - el.clientHeight)

    if (scrollPercent * 100 >= bottomOffsetThresholdPercent) {
      setIsAtBottom(true)
    } else {
      setIsAtBottom(false)
    }
  }

  useEffect(() => {
    let functionToUseOnScroll = handleScroll

    if (throttleTimer > 0) {
      functionToUseOnScroll = throttle(handleScroll, throttleTimer)
    }
    if (debounceTimer > 0) {
      functionToUseOnScroll = debounce(handleScroll, debounceTimer)
    }

    scrollElement &&
      scrollElement.addEventListener("scroll", functionToUseOnScroll)
    return () =>
      scrollElement &&
      scrollElement.removeEventListener("scroll", functionToUseOnScroll)
  }, [])

  return [isAtBottom, setIsAtBottom]
}

export default useInfiniteScroll
