<a href="https://www.npmjs.com/package/basic-modal-react"><img alt="npm" src="https://img.shields.io/npm/dw/basic-modal-react"></a>
<a href="https://www.npmjs.com/package/basic-modal-react"><img alt="npm" src="https://img.shields.io/npm/v/basic-modal-react"></a>
<a href="https://www.npmjs.com/package/basic-modal-react"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/basic-modal-react"></a>
<a href="https://www.npmjs.com/package/basic-modal-react">
<img alt="Maintenance Status" src="https://img.shields.io/badge/maintenance-active-green.svg" />
</a> 

# Basic Modal React ⚛️

<img src="https://img.shields.io/badge/-TypeScript-3178C6?logo=TypeScript&logoColor=FFFEFC&style=For-the-badge" alt="badge sample"/> <img src="https://img.shields.io/badge/-React-262627?logo=React&logoColor={LOGO-COLOR}&style=For-the-badge" alt="badge sample"/> 

We provide a modal wrapper built in typescript that offer you the basic modal functionalities to handle the components you want to display inside.

You place it instead of your trigger component and pass your content as children. The library will handle the rest.

### Features:

- Local state: you don't have to pass any state to handle the opening and closing of the modal, so you prevent useless re-rendering.
- Portal: the modal is rendered in a portal, so it's not part of your main html tree.
- Fits your UI => To use it, you have to pass your trigger component (button, icon, image, etc...) and the component you want to display as children.
- Basics Modal features:
  - A fade background (customizable) that close the modal when clicked
  - A close icon-button (X by default) but you can pass and move your own component
  - Close on escape key
  - A 'controller' function if you need to close the modal by any other handler (exemple: a submit button inside the modal)

### Install:

`npm i basic-modal-react
`

`yarn add basic-modal-react
`

`pnpm add basic-modal-react
`

---

### Examples:

Basic usage:

```js
import {Modal} from 'basic-modal-react'

export const myExample = () => {
    
    return (
        <>
            <Modal trigger={<YourButton label='Open Modal'}/>}>
                <YourComponent/>
            </Modal>
        </>
    )
}
```
Controlled usage (example: if you want to close the modal after a form submission):
```js
import {Modal, ModalChildProps} from 'basic-modal-react'

export const myExample = () => {
	
  const handleSubmit = ( closeModal: () => void) => {
    console.log('Form submitted!')
    closeModal();
  };
    
    return (
        <>
          <Modal trigger={<button>Open Modal with Form</button>}>
            {({ closeModal }: ModalChildProps) => (
                    <form >
                      {/* ... */}
                      <button onClick={() => handleSubmit(closeModal)}>Submit</button>
                    </form>
            )}
          </Modal>
        </>
    )
}
```

### props:

`trigger` | _**Required**_ | your trigger component (button, icon, image, etc...)

`children` | _**Required**_ | your content

`modalID` | _**Optional**_ | you can provide an id if you need to.


#### About Modal Id

* if you don't pass it default is 'modal'
* To display the modal we use reactPortal, react portal create a brand-new element below your main wrapper (#root)
<br/>
<br/>
  Use cases:
* If you want your modal to always be on somewhere in your html tree, you can create a div in your index.html and give it an id that you can trigger with the `modalId` prop. Now, if you pass the same id to the `modalId` prop, it will target it and won't create a new div.
* If you have nested modals, you can pass a different id to each modal to target the right one.

##### Example:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
    </head>
    <body>
        <div id="myModal"></div>
        <div id="root"></div>
    </body>
</html>
```
#### Customization

`backgroundColor` | _**Optional**_ | Just pass a valid color string ('#1F1F1F' or 'rgb(31, 31, 31)') to change the background color.

`positionX` | _**Optional**_ | Just pass a valid string ('center', 'left', 'right') to change the position of the modal on the X axis.

`positionY` | _**Optional**_ | Just pass a valid string ('center', 'top', 'bottom') to change the position of the modal on the Y axis.
- ###### you can combine both (default is center, center)

`closeComponent` | _**Optional**_ | Just pass a valid React component to change the close handler.

`closeComponentPosition` | _**Optional**_ | Just pass a valid {top, right} object to change the position of the close component.<br/>(default is: { top: '24px', right: '24px' })

`closeIconColor` | _**Optional**_ | Just pass a valid color string ('#1F1F1F' or 'rgb(31, 31, 31)') to change the color of the default close icon.

#### Example:
```js
import {Modal} from 'basic-modal-react'

export const myExample = () => {
    
    return (
        <>
            <Modal trigger={<YourButton label='Open Modal'}
                   positionX='right'
                   positionY='top'
                   backgroundColor='#1F1F1F'
                   closeIconColor='#fff'
                   closeComponent={<YourCloseComponent/>}
                   closeComponentPosition={{ top: '24px', right: '24px' }}/>}
             >
                <YourComponent/>
            </Modal>
        </>
    )
}
```

Hope you'll enjoy it!

If you have any question, feel free to ask!

If you want to contribute and make it better, feel free to do so!


