import { useEffect, useState } from "react"
import { debounce, throttle } from "../utils/helpers"

const useInfiniteScroll = ({ throttleTimer = 0, debounceTimer = 0 } = {}) => {
  const [isAtBottom, setIsAtBottom] = useState(false)

  const handleScroll = (e) => {
    const el = e.target.documentElement
    if (el.clientHeight + el.scrollTop !== el.scrollHeight) {
      setIsAtBottom(false)
    } else {
      setIsAtBottom(true)
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

    window.addEventListener("scroll", functionToUseOnScroll)
    return () => window.removeEventListener("scroll", functionToUseOnScroll)
  }, [])

  return [isAtBottom, setIsAtBottom]
}

export default useInfiniteScroll
