let pubSubEvents = {}

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

export function publish(eventName = "", data = "") {
  try {
    if (pubSubEvents[eventName]) {
      pubSubEvents[eventName].forEach((cb) => cb(data))
    }
  } catch (error) {
    console.log(`~~~ error at pub-sub publish ~~~`, error)
  }
}

export function clearAllEvents() {
  pubSubEvents = {}
}
