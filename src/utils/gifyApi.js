import { fetchJSONPromise } from "./helpers"

// to do => add abort controller

import {
  API_KEY,
  TRENDING_GIFS_BASE_API,
  SEARCH_GIFS_API_BASE,
  TRENDING_API_RATING,
  TRENDING_API_LIMIT,
} from "../constants"

export const fetchTrendingGifs = ({ offset = 0 }) => {
  return fetchJSONPromise(
    `${TRENDING_GIFS_BASE_API}?api_key=${API_KEY}&limit=${TRENDING_API_LIMIT}&rating=${TRENDING_API_RATING}&offset=${offset}`
  )
}

export const fetchSearchQueryGifs = ({ offset = 0, searchQuery = "" }) => {
  return fetchJSONPromise(
    `${SEARCH_GIFS_API_BASE}?api_key=${API_KEY}&limit=${TRENDING_API_LIMIT}&offset=${offset}&q=${searchQuery}`
  )
}
