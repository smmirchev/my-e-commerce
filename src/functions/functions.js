import { useRef, useEffect } from "react"

export const upperCase = str => {
  const value = str.replace(/-/g, " ")
  const words = value.split(" ")
  return words
    .map(word => {
      return word[0].toUpperCase() + word.substring(1)
    })
    .join(" ")
}

export const useDetectIfClickedOutside = callback => {
  const callbackRef = useRef()
  const innerRef = useRef()

  useEffect(() => {
    callbackRef.current = callback
  })

  useEffect(() => {
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
    function handleClick(e) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      )
        callbackRef.current(e)
    }
  }, [])
  return innerRef
}
