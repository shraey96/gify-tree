import React, { useState } from "react"
import VideoPlayer from "./VideoPlayer"
import LazyImage from "../LazyImage"

import { string, shape } from "prop-types"

const GifImage = ({ id, images, title, style }) => {
  const [imageLoadError, setImageLoadError] = useState(false)
  const [isEnlargedView, setIsEnlargedView] = useState(false)

  const handleImageClick = () => setIsEnlargedView(true)
  const handleImageLoadError = () => setImageLoadError(true)

  const handleVideoPlayerClose = () => setIsEnlargedView(false)

  if (imageLoadError) return null

  const {
    fixed_width_downsampled = {},
    preview_webp = {},
    preview_gif = {},
    original_mp4 = {},
  } = images

  const { webp: downSampledWebP, url: downSampledURL } = fixed_width_downsampled
  const { webp: previewWebP } = preview_webp
  const { url: previewURL } = preview_gif
  const { mp4 } = original_mp4

  const constructuredPictureSetURL = [
    {
      url: downSampledWebP,
      mediaQuery: "(min-width: 1024px)",
      type: "image/webp",
    },
    {
      url: downSampledURL,
      mediaQuery: "(min-width: 1024px)",
      type: "",
    },
    {
      url: previewWebP,
      mediaQuery: "(max-width: 480px)",
      type: "image/webp",
    },
    {
      url: previewURL,
      mediaQuery: "(max-width: 480px)",
      type: "",
    },
  ]

  return (
    <div>
      <LazyImage
        containerStyle={style}
        pictureSrcSets={constructuredPictureSetURL}
        src={downSampledURL}
        alt={title}
        id={id}
        onLoad={() => {}}
        onError={handleImageLoadError}
        onClick={handleImageClick}
      />
      {isEnlargedView && (
        <VideoPlayer
          videoSrc={mp4}
          videoPoster={downSampledWebP}
          onClose={handleVideoPlayerClose}
        />
      )}
    </div>
  )
}

GifImage.propTypes = {
  id: string,
  images: shape({}),
  style: shape({}),
  title: string,
}

GifImage.defaultProps = {
  id: "",
  images: {},
  shape: {},
  title: "",
}

export default GifImage
