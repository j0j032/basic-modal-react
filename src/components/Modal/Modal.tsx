import './Modal.css'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import {createPortal} from "react-dom";
import {ModalChildProps} from "../../index";

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
  children: React.ReactNode | ((props: ModalChildProps) => React.ReactNode);
  modalId?: string
  trigger: React.ReactNode
  onClose?: () => void
  customBG?: React.CSSProperties
  customBtn?: React.CSSProperties
}

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  children,trigger, onClose, modalId = 'new-modal', customBG, customBtn}): React.ReactElement | null => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleClose = () => {
    setIsModalOpen(false)
    if (onClose) onClose()
  }
  const handleOpen = () => setIsModalOpen(true)

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? handleClose() : null)
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleClose])


  return (
      <>
        <div onClick={handleOpen}>{trigger}</div>
        {isModalOpen && (
          <ReactPortal wrapperId={modalId}>
            <dialog onClick={handleClose} className='bg' style={customBG}>
              <div onClick={(e) => e.stopPropagation()} className='container'>
                <button onClick={handleClose} className='closeBtn' style={customBtn}>
                  ✕
                </button>
                {typeof children === "function" ? children({ closeModal: handleClose }) : children}
              </div>
            </dialog>
          </ReactPortal>
        )}
      </>
  )
}

export default Modal
