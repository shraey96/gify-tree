import { isMobile } from "./helpers"

export const getGifHeight = ({ images }, gifWidth) => {
  const { fixed_width } = images
  if (fixed_width) {
    const { width, height } = fixed_width
    const aspectRatio = width / height
    return Math.round(gifWidth / aspectRatio)
  }
  return 0
}

export const getGifWidth = ({ images }, gifHeight) => {
  const { fixed_width } = images
  if (fixed_width) {
    const { width, height } = fixed_width
    const aspectRatio = width / height
    return Math.round(gifHeight * aspectRatio)
  }
  return 0
}

export const getGifItemHeights = (data = [], gifWidth) =>
  data.map((gif) => getGifHeight(gif, gifWidth))

//   figure out fillArray
export const fillArray = (length, columnOffsets = []) =>
  Array.apply(null, Array(length)).map((_, index) => columnOffsets[index] || 0)

export const getBaseConfigForMasonryLayout = (container) => {
  const isMobileDevice = isMobile()

  const width = isMobileDevice
    ? window.innerWidth - 8 * 2
    : container?.getBoundingClientRect()?.width || window.innerWidth

  const columns = isMobileDevice ? 3 : 4
  const gutter = 10
  const gutterOffset = gutter * (columns - 1)
  const gifWidth = Math.floor((width - gutterOffset) / columns)

  return {
    columns,
    gutter,
    gifWidth,
  }
}
