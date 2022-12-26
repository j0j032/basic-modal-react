import './Modal.css'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import {createPortal} from "react-dom";

function createWrapper(wrapperId: string) {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  wrapperElement.classList.add('modal-wrapper', 'animation')
  document.body.appendChild(wrapperElement)
  return wrapperElement
}

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

type ModalProps = {
  modalId?: string
  children: React.ReactNode
  isOpen: boolean
  handleClose: () => void
  customBG?: React.CSSProperties
  customBtn?: React.CSSProperties
}

const Modal = ({
  modalId = 'new-modal',
  children,
  isOpen,
  handleClose,
  customBG,
  customBtn,
}: ModalProps): React.ReactElement | null => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? handleClose() : null)
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleClose])

  if (!isOpen) return null

  return (
    <ReactPortal wrapperId={modalId}>
      <dialog onClick={handleClose} className='bg' style={customBG}>
        <div onClick={(e) => e.stopPropagation()} className='container'>
          <button onClick={handleClose} className='closeBtn' style={customBtn}>
            ✕
          </button>
          {children}
        </div>
      </dialog>
    </ReactPortal>
  )
}

export default Modal
