import {render, fireEvent, screen, waitFor} from '@testing-library/react'
import Modal from './Modal'
import React from 'react'

describe('Modal', () => {

    it('renders correctly', () => {
        render(<Modal trigger={<button>Open Modal</button>}>Hello, World!</Modal>)
        expect(screen.getByText('Open Modal')).toBeInTheDocument()
    })

    it('renders the modal content in a div with the specified ID', () => {
        render(
            <Modal trigger={<button>Open Modal</button>} modalId="my-modal-id">
                Hello, World!
            </Modal>
        )

        fireEvent.click(screen.getByText('Open Modal'))

        expect(screen.getByText('Hello, World!')).toBeInTheDocument()
        expect(document.getElementById('my-modal-id')).toBeInTheDocument()
    })

    it('creates a new div with the specified ID if it does not already exist', () => {
        expect(document.getElementById('my-modal-id')).not.toBeInTheDocument()

        render(
            <Modal trigger={<button>Open Modal</button>} modalId="my-modal-id">
                Hello, World!
            </Modal>
        )

        fireEvent.click(screen.getByText('Open Modal'))

        expect(document.getElementById('my-modal-id')).toBeInTheDocument()
    })

    it('uses an existing div with the specified ID if it already exists', () => {
        const existingDiv = document.createElement('div')
        existingDiv.setAttribute('id', 'my-modal-id')
        document.body.appendChild(existingDiv)

        render(
            <Modal trigger={<button>Open Modal</button>} modalId="my-modal-id">
                Hello, World!
            </Modal>
        )

        fireEvent.click(screen.getByText('Open Modal'))

        expect(document.getElementById('my-modal-id')).toBe(existingDiv)

        // Clean up after the test by removing the div
        document.body.removeChild(existingDiv)
    })

    it('sets the modal ID', () => {
        render(
            <Modal trigger={<button>Open Modal</button>} modalId="customModalId">
                Hello, World!
            </Modal>
        )

        fireEvent.click(screen.getByText('Open Modal'))

        const modalElement = document.getElementById('customModalId')

        expect(modalElement).toBeInTheDocument()
    })

    it('opens the modal when the trigger is clicked', () => {
        render(<Modal trigger={<button>Open Modal</button>}>Hello, World!</Modal>)
        fireEvent.click(screen.getByText('Open Modal'))
        expect(screen.getByText('Hello, World!')).toBeInTheDocument()
    })

    it('closes the modal when the close button is clicked', () => {
        render(<Modal trigger={<button>Open Modal</button>}>Hello, World!</Modal>)
        fireEvent.click(screen.getByText('Open Modal'))
        expect(screen.getByText('Hello, World!')).toBeInTheDocument()

        const closeButton = document.querySelector('.defaultCloseIcon') as Element
        fireEvent.click(closeButton)

        expect(screen.queryByText('Hello, World!')).not.toBeInTheDocument()
    })

    it('closes the modal when the escape key is pressed', () => {
        const { container } = render(<Modal trigger={<button>Open Modal</button>}>Hello, World!</Modal>)
        fireEvent.click(screen.getByText('Open Modal'))
        fireEvent.keyDown(container, { key: 'Escape', code: 'Escape' })
        expect(screen.queryByText('Hello, World!')).not.toBeInTheDocument()
    })

    it('closes the modal when the background is clicked', () => {
        render(<Modal trigger={<button>Open Modal</button>}>Hello, World!</Modal>)
        fireEvent.click(screen.getByText('Open Modal'))
        fireEvent.click(document.querySelector('.bg') as Element)
        expect(screen.queryByText('Hello, World!')).not.toBeInTheDocument()
    })

    it('calls the onClose callback when the modal is closed', () => {
        const onClose = jest.fn()
        render(<Modal trigger={<button>Open Modal</button>} onClose={onClose}>Hello, World!</Modal>)
        fireEvent.click(screen.getByText('Open Modal'))

        const closeButton = document.querySelector('.defaultCloseIcon') as Element
        fireEvent.click(closeButton)

        expect(onClose).toHaveBeenCalled()
    })

    it('closes the modal when the user takes control on another handler (ex: form is submitted)', () => {
        const handleSubmit = (closeModal: Function) => {
            // form submission logic...
            closeModal()
        }

        render(
            <Modal trigger={<button>Open Modal with Form</button>}>
                {({ closeModal }) => (
                    <div>
                        <h1>Form</h1>
                        <button onClick={() => handleSubmit(closeModal)}>Submit</button>
                    </div>
                )}
            </Modal>
        )

        fireEvent.click(screen.getByText('Open Modal with Form'))
        fireEvent.click(screen.getByText('Submit'))
        expect(screen.queryByText('Form')).not.toBeInTheDocument()
    })


    it('renders a custom close button when provided', () => {
        const CloseButton = <button>Close</button>
        render(<Modal trigger={<button>Open Modal</button>} closeComponent={CloseButton}>Hello, World!</Modal>)
        fireEvent.click(screen.getByText('Open Modal'))
        expect(screen.getByText('Close')).toBeInTheDocument()
    })

    it('does not close the modal when the container is clicked', () => {
        render(<Modal trigger={<button>Open Modal</button>}>Hello, World!</Modal>)
        fireEvent.click(screen.getByText('Open Modal'))
        fireEvent.click(screen.getByText('Hello, World!'))
        expect(screen.getByText('Hello, World!')).toBeInTheDocument()
    })

    it('renders modal at specified position', () => {
        render(<Modal trigger={<button>Open Modal</button>} positionX="right" positionY="bottom">Hello, World!</Modal>)
        fireEvent.click(screen.getByText('Open Modal'))
        expect(document.querySelector('.position-bottom-right')).toBeInTheDocument()
    })

    it('renders modal with specified backgroundColor', () => {
        render(<Modal trigger={<button>Open Modal</button>} backgroundColor="rgba(255, 0, 0, 0.42)">Hello, World!</Modal>)
        fireEvent.click(screen.getByText('Open Modal'))
        expect(document.querySelector('dialog')?.style.backgroundColor).toBe('rgba(255, 0, 0, 0.42)')
    })

    it('sets the close button color', () => {
        render(
            <Modal trigger={<button>Open Modal</button>} closeIconColor="#123456">
                Hello, World!
            </Modal>
        )

        fireEvent.click(screen.getByText('Open Modal'))

        const closeButton = document.querySelector('.defaultCloseIcon') as Element

        expect(closeButton).toHaveStyle({ color: '#123456' })
    })

    it('sets the close button position', () => {
        render(
            <Modal trigger={<button>Open Modal</button>} closeComponentPosition={{ top: '50px', right: '50px' }}>
                Hello, World!
            </Modal>
        )

        fireEvent.click(screen.getByText('Open Modal'))

        const closeButton = document.querySelector('.defaultCloseIcon') as Element

        expect(closeButton).toHaveStyle({ top: 50, right: 50 })
    })

    it('throws an error for invalid background color', () => {
        expect(() => {
            render(
                <Modal
                    trigger={<button>Open Modal</button>}
                    backgroundColor="invalid-color"
                >
                    Hello, World!
                </Modal>
            );
        }).toThrow('Invalid Modal background color');
    });

    it('throws an error for invalid positionY', () => {
        expect(() => {
            render(
                <Modal
                    trigger={<button>Open Modal</button>}
                    //@ts-ignore
                    positionY="invalid-position"
                >
                    Hello, World!
                </Modal>
            );
        }).toThrow('Invalid Modal positionY');
    });

    it('throws an error for invalid positionX', () => {
        expect(() => {
            render(
                <Modal
                    trigger={<button>Open Modal</button>}
                    //@ts-ignore
                    positionX="invalid-position"
                >
                    Hello, World!
                </Modal>
            );
        }).toThrow('Invalid Modal positionX');
    });

    it('adds the "visible" class to the wrapper element', async () => {
        render(
            <Modal trigger={<button>Open Modal</button>} modalId="my-modal-id">
                Modal Content
            </Modal>
        );

        fireEvent.click(screen.getByText('Open Modal'));

        await waitFor(() => {
            const wrapperElement = document.getElementById('my-modal-id') as Element;
            expect(wrapperElement).toHaveClass('visible');
        });
    });
})
