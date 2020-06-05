import React, { useEffect, useRef } from 'react'

export default function WhenClickOutside ({ children, callback }) {
  const wrapperRef = useRef(null)

  const handleClickOutside = useCallback(event => {
    if (wrapperRef && wrapperRef.contains(event.target)) {
      callback(event)
    }
  })

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return <div ref={wrapperRef}>{children}</div>
}
