import { createContext, useContext } from 'react'

const Cache = createContext(new Map())

export const useDataFrom = url => {
  const cache = useContext(Cache)
  if (cache.has(url)) return cache.get(url)

  const promise = window
    .fetch(url)
    .then(response => response.json())
    .then(data => cache.set(url, data))
    .catch(() => cache.set(url, {}))

  throw promise
}
