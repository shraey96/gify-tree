import React, { memo } from "react"
import { arrayOf, shape, bool, number, element } from "prop-types"

import { getGifHeight, getGifWidth, fillArray } from "utils/giphyUIHelpers"

import { LAZY_IMG_LOADER_BGS } from "../../constants"

const MasonryGrid = memo(
  ({
    columns,
    gutter,
    useTransform,
    itemWidth,
    itemHeights,
    children,
    randomlyFillBgColor,
  }) => {
    const containerStyle = {}
    const getChildren = () => {
      let columnTarget
      const columnHeights = fillArray(columns)

      const result = React.Children.map(children, (child, index) => {
        const { images } = child.props
        const style = {
          position: "absolute",
          cursor: "pointer",
        }

        columnTarget = columnHeights.indexOf(Math.min(...columnHeights))
        const top = `${columnHeights[columnTarget]}px`
        const left = `${columnTarget * itemWidth + columnTarget * gutter}px`
        // left => item width * columnNumber to adjust left spacing + columnNumber * gutter

        if (useTransform) {
          style.transform = `translate3d(${left}, ${top}, 0)`
        } else {
          style.top = top
          style.left = left
        }

        if (images) {
          const gifHeight = getGifHeight({ images }, itemWidth)
          const gifWidth = getGifWidth({ images }, gifHeight)
          style.height = gifHeight
          style.width = gifWidth
        }

        if (randomlyFillBgColor) {
          style.background =
            LAZY_IMG_LOADER_BGS[index % LAZY_IMG_LOADER_BGS.length]
        }

        const height = itemHeights[index]
        if (height) {
          columnHeights[columnTarget] += height + gutter
        }
        containerStyle.position = "relative"
        containerStyle.width = `${
          columns * itemWidth + (columns - 1) * gutter
        }px`
        containerStyle.height = `${Math.max(...columnHeights) - gutter}px`
        return React.cloneElement(child, { style })
      })

      return result
    }

    return <div style={containerStyle}>{getChildren()}</div>
  },
  (prev, next) => {
    return prev.children.length === next.children.length
  }
)

MasonryGrid.propTypes = {
  columns: number,
  gutter: number,
  useTransform: bool,
  itemWidth: number,
  itemHeights: arrayOf(shape(number)),
  randomlyFillBgColor: bool,
  children: element,
}

MasonryGrid.defaultProps = {
  useTransform: true,
  randomlyFillBgColor: true,
  itemHeights: [],
}

export default MasonryGrid
