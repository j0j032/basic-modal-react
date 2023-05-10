import './Modal.css'
import React, {CSSProperties, ReactNode, useCallback, useEffect, useLayoutEffect, useState} from 'react'
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


type CloseHandlerPosition = {
    top?: string
    right?: string
}

type ModalProps = {
    children: ReactNode | ((props: { closeModal: () => void }) => ReactNode);
    trigger: ReactNode
    modalId?: string
    backgroundColor?: string
    onClose?: () => void
    positionY?: 'center' | 'top' | 'bottom'
    positionX?: 'center' | 'left' | 'right'
    closeComponent?: ReactNode
    closeComponentPosition?: CloseHandlerPosition
    closeIconColor?: string
}

const validateProps = (props: ModalProps) => {
    // check if background color is valid
    const validColor = (color: string) => {
        const s = new Option().style;
        s.color = color;
        return s.color !== '';
    }
    if (!validColor(props.backgroundColor || '')) {
        throw new Error('Invalid Modal background color')
    }
    // check if position is valid
    if (!['center', 'top', 'bottom'].includes(props.positionY || '')) {
        throw new Error('Invalid Modal positionY')
    }
    if (!['center', 'left', 'right'].includes(props.positionX || '')) {
        throw new Error('Invalid Modal positionX')
    }
}

const CloseButton = ({ color = '#1F1F1F'}: { color?: string}) => (
    <button className='defaultCloseIcon' style={{ color }}>✕</button>
)

const Modal: React.FC<ModalProps> = ({
                                         children,
                                         modalId = 'modal',
                                         closeIconColor,
                                         trigger,
                                         closeComponent,
                                         closeComponentPosition = { top: '24px', right: '24px' },
                                         onClose,
                                         backgroundColor = 'rgba(0, 0, 0, 0.42)',
                                         positionX = 'center',
                                         positionY = 'center'
                                     }) => {

    useEffect(() => {
        validateProps({ children, trigger, modalId, backgroundColor, onClose, positionY, positionX, closeComponent, closeComponentPosition, closeIconColor });
    }, [children, trigger, modalId, backgroundColor, onClose, positionY, positionX, closeComponent, closeComponentPosition, closeIconColor]);

    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleClose = useCallback(() => {
        setIsModalOpen(false)
        if (onClose) onClose()
    }, [onClose])

    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? handleClose() : null)
        document.body.addEventListener('keydown', closeOnEscapeKey)
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey)
        }
    }, [handleClose])

    // handle custom position by setting className
    const modalPositionClass = `position-${positionY}-${positionX}`

    const dialogStyle: CSSProperties = {
        backgroundColor
    }

    return (
        <>
            <div onClick={() => setIsModalOpen(true)}>{trigger}</div>
            {isModalOpen && (
                <ReactPortal wrapperId={modalId}>
                    <dialog onClick={handleClose}
                            className={`${modalPositionClass} bg`}
                            style={dialogStyle}>
                        <div onClick={(e) => e.stopPropagation()} className='container'>
                            <div onClick={handleClose} className='closeHandler' style={closeComponentPosition}>
                                {closeComponent ? closeComponent : <CloseButton color={closeIconColor}/>}
                            </div>
                            {typeof children === "function" ? children({ closeModal: handleClose }): children}
                        </div>
                    </dialog>
                </ReactPortal>
            )}
        </>
    )
}

export default Modal;
