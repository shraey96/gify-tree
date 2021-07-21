import {
  LOCAL_STORAGE_CACHED_RESULTS_KEY,
  LOCAL_STORAGE_IS_DARK_MODE,
} from "../constants"

/**
 * @function isMobile
 *
 * @description Checks if device is a mobile using navigator.userAgent
 * @returns {boolean}
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

/**
 * @function fetchJSONPromise
 * @param {string} url
 * @param {object} config
 *
 * @description Returns a promise via fetch API. Used for data fetchings
 * @returns {Promise}
 */
export const fetchJSONPromise = async (url = "", config = {}) => {
  try {
    const resp = await fetch(url, config)
    const parsedResp = await resp.json()
    return parsedResp
  } catch (error) {
    return error
  }
}

/**
 * @function debounce
 * @param {Function} func
 * @param {number} delay
 *
 * @description Returns function in debounced form
 * @returns {Function}
 */
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

/**
 * @function throttle
 * @param {Function} fn
 * @param {number} wait
 *
 * @description Returns function in throttled form
 * @returns {Function}
 */
export const throttle = (fn, wait) => {
  let time = Date.now()
  return function (...args) {
    if (time + wait - Date.now() < 0) {
      fn.apply(this, args)
      time = Date.now()
    }
  }
}

/**
 * @function getContainerWidth
 * @param {container} wait
 *
 * @description Returns width of an element
 * @returns {number}
 */
export const getContainerWidth = (container) =>
  container?.getBoundingClientRect()?.width || 0

/** Below functions are used to fetch cached items from local storage */

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

export const getLocalStorageDarkTheme = () => {
  try {
    return [null, "true"].includes(
      localStorage.getItem(LOCAL_STORAGE_IS_DARK_MODE)
    )
      ? true
      : false
  } catch (error) {
    return false
  }
}

export const setLocalStorageDarkTheme = (isDarkMode = true) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_IS_DARK_MODE, isDarkMode)
  } catch (error) {
    return false
  }
}
