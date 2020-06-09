import React, { useCallback, useEffect, useRef } from 'react'

export default function WhenClickOutside ({ children, callback }) {
  const wrapperRef = useRef(null)

  const handleClickOutside = useCallback(
    event => {
      if (wrapperRef && wrapperRef.contains(event.target)) {
        callback(event)
      }
    },
    [wrapperRef, callback]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  return <div ref={wrapperRef}>{children}</div>
}
