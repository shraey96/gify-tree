import { isMobile } from "./helpers"

/**
 * @function getGifHeight
 * @param {object} data
 * @param {number} gifWidth
 * @description Gets gif height based on gif width
 * @returns {number}
 */
export const getGifHeight = ({ images }, gifWidth) => {
  const { fixed_width } = images
  if (fixed_width) {
    const { width, height } = fixed_width
    const aspectRatio = width / height
    return Math.round(gifWidth / aspectRatio)
  }
  return 0
}

/**
 * @function getGifWidth
 * @param {object} data
 * @param {number} gifHeight
 * @description Gets gif width based on gif height
 * @returns {number}
 */
export const getGifWidth = ({ images }, gifHeight) => {
  const { fixed_width } = images
  if (fixed_width) {
    const { width, height } = fixed_width
    const aspectRatio = width / height
    return Math.round(gifHeight * aspectRatio)
  }
  return 0
}

/**
 * @function fillArray
 * @param {number} length
 * @param {Array} columnOffsets
 * @description Returns array for calculation of position of gif, based on columnOffsets
 * @returns {Array}
 */

export const fillArray = (length, columnOffsets = []) =>
  Array.apply(null, Array(length)).map((_, index) => columnOffsets[index] || 0)

/**
 * @function getBaseConfigForMasonryLayout
 * @param {number} customWidth
 * @description Returns config for masory layout according to device and customWidth
 * @returns {object}
 */
export const getBaseConfigForMasonryLayout = (customWidth) => {
  const isMobileDevice = isMobile()

  const width = isMobileDevice
    ? window.innerWidth - 8 * 2
    : customWidth || window.innerWidth

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

export const getGifItemHeights = (data = [], gifWidth) =>
  data.map((gif) => getGifHeight(gif, gifWidth))
