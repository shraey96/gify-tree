import React, { useEffect, useRef } from "react"
import { string, func, arrayOf, shape, bool } from "prop-types"

import useIntersectionObserver from "customHooks/useIntersectionObserver"

import "./style.scss"

const LazyImage = ({
  id,
  src,
  alt,
  containerStyle,
  containerClasses,
  imageStyle,
  imageClasses,
  shouldLoadImmediately,
  pictureSrcSets,
  rootMargin,
  onLoad,
  onError,
  onClick,
}) => {
  const [ref, entry, unObserve, node] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin,
  })
  const imageRef = useRef()

  const unmountImage = () => {
    if (imageRef && imageRef.current) {
      imageRef.current.removeAttribute("src")
    }
  }

  const updatePictureSrc = () => {
    Array.from(document.querySelectorAll(`#picture-set__${id} source`)).forEach(
      (source) => {
        const dataSrcSet = source.dataset.srcset
        if (dataSrcSet) {
          source.srcset = dataSrcSet
        }
      }
    )
  }

  useEffect(() => {
    return () => unmountImage()
  }, [])

  useEffect(() => {
    if (!imageRef.current.src && shouldLoadImmediately) {
      imageRef.current.src = src
    }
  }, [shouldLoadImmediately])

  useEffect(() => {
    if (
      entry.isIntersecting &&
      entry.intersectionRatio > 0.1 &&
      !imageRef.current.src
    ) {
      updatePictureSrc()
      imageRef.current.src = src
    }
  }, [entry.intersectionRatio, entry.isIntersecting])

  const handleonImageLoad = () => {
    imageRef.current.classList.add("lazy__img--loaded")
    node.style.background = "transparent"

    onLoad(id)
    unObserve()
  }

  const handleonImageError = (e) => {
    onError(e)
  }

  const handleonImageClick = () => {
    onClick()
  }

  return (
    <div
      className={`lazy-img__container ${containerClasses}`}
      ref={ref}
      onClick={handleonImageClick}
      style={containerStyle}
    >
      <picture id={`picture-set__${id}`}>
        {pictureSrcSets.map((dataSrcSet) => {
          const { url, mediaQuery, type } = dataSrcSet
          return (
            <source
              key={url}
              data-srcset={url}
              media={mediaQuery}
              type={type}
            />
          )
        })}
        <img
          style={imageStyle}
          className={imageClasses}
          ref={imageRef}
          onLoad={handleonImageLoad}
          onError={handleonImageError}
          alt={alt}
        />
      </picture>
    </div>
  )
}

LazyImage.propTypes = {
  id: string,
  src: string,
  alt: string,
  containerStyle: shape({}),
  containerClasses: "",
  imageStyle: shape({}),
  imageClasses: "",
  rootMargin: string,
  shouldLoadImmediately: bool,
  pictureSrcSets: arrayOf(
    shape({
      url: string,
      mediaQuery: string,
      type: string,
    })
  ),
  onLoad: func,
  onError: func,
  onClick: func,
}

LazyImage.defaultProps = {
  pictureSrcSets: [],
  rootMargin: "0px",
  containerStyle: {},
  containerClasses: "",
  imageStyle: {},
  imageClasses: "",
  onLoad: () => null,
  onError: () => null,
  onClick: () => null,
}

export default LazyImage
