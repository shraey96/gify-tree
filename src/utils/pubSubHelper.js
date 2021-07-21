let pubSubEvents = {}

/**
 * @function subscribe
 * @param {string} eventName
 * @param {Function} cb
 *
 * @description Registers function for mentioned eventName to listen for event. Returns unsubscribe function
 * @returns {Function}
 */
export function subscribe(eventName = "", cb) {
  if (typeof cb !== "function") {
    throw new Error("callback provided is not a function")
  }

  try {
    if (!pubSubEvents[eventName]) {
      pubSubEvents[eventName] = []
    }
    pubSubEvents[eventName].push(cb)
  } catch (error) {
    console.log(`~~~ error at pub-sub subscribe ~~~`, error)
  }

  return function unSubscribe() {
    try {
      const index = pubSubEvents[eventName].indexOf(cb)
      pubSubEvents[eventName].splice(index, 1)
    } catch (error) {
      console.log(`~~~ error at pub-sub unSubscribe ~~~`, error)
    }
  }
}

/**
 * @function publish
 * @param {string} eventName
 * @param {Function} data
 *
 * @description Dispatches subscribed function for mentioned eventName with data
 */
export function publish(eventName = "", data = "") {
  try {
    if (pubSubEvents[eventName]) {
      pubSubEvents[eventName].forEach((cb) => cb(data))
    }
  } catch (error) {
    console.log(`~~~ error at pub-sub publish ~~~`, error)
  }
}

/**
 * @function clearAllEvents
 *
 * @description Clears all subscribed events for pub-sub
 */
export function clearAllEvents() {
  pubSubEvents = {}
}
