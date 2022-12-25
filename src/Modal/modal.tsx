//import './Modal.css'
import React, { useEffect } from 'react'
import ReactPortal from './ReactPortal.jsx'

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
