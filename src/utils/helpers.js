import { LOCAL_STORAGE_CACHED_RESULTS_KEY } from "../constants"

export const fetchJSONPromise = async (url = "", config = {}) => {
  try {
    const resp = await fetch(url, config)
    const parsedResp = await resp.json()
    return parsedResp
  } catch (error) {
    return error
  }
}

export const debounce = (func, delay) => {
  let timeout = ""
  function cancel() {
    clearTimeout(timeout)
  }
  function executedFunction(...args) {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      func.apply(this, args)
    }, delay || 500)
  }
  executedFunction.cancel = cancel
  return executedFunction
}

export const throttle = (fn, wait) => {
  let time = Date.now()
  return function (...args) {
    if (time + wait - Date.now() < 0) {
      fn.apply(this, args)
      time = Date.now()
    }
  }
}

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

export const getLocalStorageCachedResults = () => {
  try {
    return (
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_CACHED_RESULTS_KEY)) || []
    )
  } catch (error) {
    return {}
  }
}

export const setLocalStorageCachedResults = (data = []) => {
  try {
    if (data.length > 0) {
      localStorage.setItem(
        LOCAL_STORAGE_CACHED_RESULTS_KEY,
        JSON.stringify(data.slice(0, 50))
      )
    }
  } catch (error) {
    return {}
  }
}
