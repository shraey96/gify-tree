import React, { useState, useEffect, useCallback } from "react"

import usePrevious from "customHooks/usePrevious"

import SearchBox from "components/SearchBox"

import { debounce } from "utils/helpers"
import { publish } from "utils/pubSubHelper"
import { PUB_SUB_DEBOUNCE_GIF_SEARCH } from "../../../constants"

const SearchContainer = () => {
  const [val, setVal] = useState("")
  const prevStateVal = usePrevious(val)

  const handleValUpdate = (e) => setVal(e.target.value)

  const handleDebouncedGifSearch = (val = "") =>
    publish(PUB_SUB_DEBOUNCE_GIF_SEARCH, val)

  const debounceLoadData = useCallback(
    debounce(handleDebouncedGifSearch, 500),
    []
  )

  useEffect(() => {
    if (val !== prevStateVal) debounceLoadData(val)
  }, [val])

  return (
    <SearchBox
      placeholder="Search for a GIF!"
      value={val}
      onChange={handleValUpdate}
    />
  )
}

export default SearchContainer
