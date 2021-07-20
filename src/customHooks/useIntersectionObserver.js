import { useEffect, useRef, useState } from "react"

const useInterSectionObserver = ({
  root = null,
  rootMargin = "0px 0px 0px 0px",
  threshold = 0,
}) => {
  const [entry, updateEntry] = useState({})
  const [node, setNode] = useState(null)
  const observer = useRef(
    new window.IntersectionObserver(
      ([intersectionEntry]) => updateEntry(intersectionEntry),
      {
        root,
        rootMargin,
        threshold,
      }
    )
  )

  const unObserve = () => {
    const { current: currentObserver } = observer
    currentObserver.disconnect()
  }

  useEffect(() => {
    const { current: currentObserver } = observer
    currentObserver.disconnect()

    if (node) currentObserver.observe(node)

    return () => currentObserver.disconnect()
  }, [node])

  return [setNode, entry, unObserve, node]
}

export default useInterSectionObserver
