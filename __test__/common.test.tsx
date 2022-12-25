import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import Modal from '../src/Modal/modal'

describe('modal render', ()=> {
    const [isOpen, setIsOpen] = React.useState(false)
    it('should renders without crashing',()=> {
        render(
            <Modal isOpen={isOpen} handleClose={()=>setIsOpen(false)}>
                <div>Hello World</div>
            </Modal>
        )
    })
})
