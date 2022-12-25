import { createPortal } from 'react-dom'
import { createWrapper } from './createWrapper.js'
import React, { useLayoutEffect, useState } from 'react'

type ReactPortalProps = {
  wrapperId?: string
  children: React.ReactNode
}
const ReactPortal = ({ children, wrapperId = 'react-portal-wrapper' }: ReactPortalProps) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null)

  useLayoutEffect(() => {
    let element: HTMLElement | null = document.getElementById(wrapperId),
      systemCreated = false
    if (!element) {
      systemCreated = true
      element = createWrapper(wrapperId)
      requestAnimationFrame(() => {
        element?.classList.remove('animation')
      })
    }
    setWrapperElement(element)

    return () => {
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [wrapperId])

  if (wrapperElement === null) return null

  return createPortal(children, wrapperElement)
}

export default ReactPortal
