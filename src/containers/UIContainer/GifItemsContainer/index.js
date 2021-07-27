import React, { useEffect, useState, useRef, useMemo } from "react"
import { toast } from "react-toastify"

import { fetchTrendingGifs, fetchSearchQueryGifs } from "utils/gifyApi"
import {
  getGifItemHeights,
  getBaseConfigForMasonryLayout,
} from "utils/giphyUIHelpers"

import {
  getLocalStorageCachedResults,
  setLocalStorageCachedResults,
  getContainerWidth,
} from "utils/helpers"

import useInfiniteScroll from "customHooks/useInfiniteScroll"

import MasonryGrid from "containers/LayoutContainers/MasonryGrid"
import GifImage from "components/GifImage"
import Loader from "components/Loader"

import { subscribe, clearAllEvents } from "utils/pubSubHelper"
import {
  PUB_SUB_DEBOUNCE_GIF_SEARCH,
  TRENDING_API_LIMIT,
} from "../../../constants"

const initialCachedResults = getLocalStorageCachedResults()

const GifItemsContainer = ({ parentRef }) => {
  const [isAtBottom, setIsAtBottom] = useInfiniteScroll({
    bottomOffsetThresholdPercent: 95,
  })

  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState(initialCachedResults)

  const currentPage = useRef(0)
  const currentSearchTerm = useRef("")
  const noMoreResults = useRef(false)

  const handleFetch = async (searchQuery = currentSearchTerm.current) => {
    if (noMoreResults.current) return
    setIsFetching(true)
    const isGIFSearchMode = searchQuery.length > 0
    const apiQueryPayload = {
      offset: currentPage.current * TRENDING_API_LIMIT,
      searchQuery,
    }
    try {
      const resp = await (isGIFSearchMode
        ? fetchSearchQueryGifs(apiQueryPayload)
        : fetchTrendingGifs(apiQueryPayload))
      if (resp.data) {
        if (resp.data.length === 0 || resp.data.length < TRENDING_API_LIMIT) {
          noMoreResults.current = true
        }
        setData((prevData) => [...prevData, ...resp.data])

        if (currentPage.current === 0) {
          if (searchQuery === "") setLocalStorageCachedResults(resp.data)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(`Sorry, we couldn't load more GIFs :(`)
    }
    setIsFetching(false)
    setIsAtBottom(false)
  }

  const handleGifSearchFromAPI = (val) => {
    currentPage.current = 0
    currentSearchTerm.current = val
    noMoreResults.current = false

    window.scrollTo(0, 0)
    setData([])
    handleFetch(val)
  }

  const bindGifSearchSubscriber = () => {
    subscribe(PUB_SUB_DEBOUNCE_GIF_SEARCH, handleGifSearchFromAPI)
  }

  const { columns, gutter, gifWidth } = useMemo(
    () =>
      getBaseConfigForMasonryLayout(
        parentRef.current ? getContainerWidth(parentRef.current) : 1040
      ),
    [parentRef.current]
  )

  const itemHeights = useMemo(
    () => getGifItemHeights(data, gifWidth),
    [data.length]
  )

  useEffect(() => {
    handleFetch()
    bindGifSearchSubscriber()

    return () => clearAllEvents()
  }, [])

  useEffect(() => {
    if (isAtBottom && !isFetching) {
      currentPage.current++
      setIsAtBottom(false)
      handleFetch()
    }
  }, [isAtBottom, isFetching])

  if (data.length === 0 && isFetching) return <Loader />
  if (data.length === 0) return <p className="empty-text">No Items Found</p>

  return (
    <div className="gif-items__container">
      <MasonryGrid
        itemHeights={itemHeights}
        itemWidth={gifWidth}
        columns={columns}
        gutter={gutter}
      >
        {data.map((item, index) => {
          return <GifImage key={item.id + index} index={index} {...item} />
        })}
      </MasonryGrid>
      {isFetching && <Loader isBottomLoader />}
    </div>
  )
}

export default GifItemsContainer
