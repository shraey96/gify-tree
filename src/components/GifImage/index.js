import React, { useState } from "react"
import VideoPlayer from "./VideoPlayer"
import LazyImage from "../LazyImage"

const GifImage = ({ id, url, images, title, index, style }) => {
  const [imageLoadError, setImageLoadError] = useState(false)
  const [isEnlargedView, setIsEnlargedView] = useState(false)

  const handleImageClick = () => setIsEnlargedView(true)
  const handleImageLoadError = () => setImageLoadError(true)

  if (imageLoadError) return null

  const handleVideoPlayerClose = () => setIsEnlargedView(false)

  const {
    original = {},
    downsized = {},
    fixed_width_downsampled = {},
    preview_webp = {},
    preview_gif = {},
    original_mp4 = {},
  } = images

  const { webp: originalWebP, url: originalURL } = original
  const { url: downSizedURL } = downsized
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
        srcset=""
        sizes=""
        pictureSrcSets={constructuredPictureSetURL}
        src={downSizedURL}
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

export default GifImage
