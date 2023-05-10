import './App.css'
// @ts-ignore
import {Modal, ModalChildProps} from '../../src';

function App() {
    const handleSubmit = ( closeModal: () => void) => {
        console.log('Form submitted!')
        closeModal();
    };

    /*return (
        <div>
            <Modal trigger={<button>Open Modal</button>}>
                <div className='content'>
                    Hello World
                </div>
            </Modal>
        </div>
    )*/

    return (
        <div>
            <Modal trigger={<button>Open Modal with Form</button>}
                   positionX='right'
                   positionY='center'
                   backgroundColor='#181818'
                   closeIconColor='#fff'
            >
                {({ closeModal }: ModalChildProps) => (
                    <div className='content'>
                        <h1>Form</h1>
                        {/* ... */}
                        <button onClick={() => handleSubmit(closeModal)}>Submit</button>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default App
