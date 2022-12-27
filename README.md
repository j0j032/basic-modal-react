<a href="https://www.npmjs.com/package/basic-modal-react"><img alt="npm" src="https://img.shields.io/npm/dw/basic-modal-react"></a>
<a href="https://www.npmjs.com/package/basic-modal-react"><img alt="npm" src="https://img.shields.io/npm/v/basic-modal-react"></a>
<a href="https://www.npmjs.com/package/basic-modal-react"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/basic-modal-react"></a>
<a href="https://www.npmjs.com/package/basic-modal-react">
<img alt="Maintenance Status" src="https://img.shields.io/badge/maintenance-active-green.svg" />
</a> 

# Basic Modal React

<img src="https://img.shields.io/badge/-TypeScript-3178C6?logo=TypeScript&logoColor=FFFEFC&style=For-the-badge" alt="badge sample"/> <img src="https://img.shields.io/badge/-React-262627?logo=React&logoColor={LOGO-COLOR}&style=For-the-badge" alt="badge sample"/> 

We provide a modal wrapper built in typescript that offer you the basic modal functionalities to handle the components you want to display inside.

### Features:

- A clickable fade background that close the modal
- Your component will always be centered
- A close icon-button (X)
- You'll have the possibility to custom the background and the close icon-btn

### Install:

`npm i basic-modal-react
`

`yarn add basic-modal-react
`

`pnpm add basic-modal-react
`

---

### Example:

```js
import React, {useState} from 'react'
import {Modal} from 'basic-modal-react'

export const myExample = () => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)}>Open me</button>
            {isOpen && 
                <Modal modalId={'modal'} 
                       isOpen={isOpen}  
                       handleClose={() => setIsOpen(false)} 
                       customBtn={{'color': '#fffefc'}} 
                       customBG={{'background-color': '#fffefc'}}>
                    <YourComponent/>
	        </Modal>}
        </>
	)
}
```

### props:

`modalID` a string id if  you need to name the modal | _**Optional**_

`ìsOpen` your boolean state | _**Required**_

`handleClose` your state setter | _**Required**_

`customBtn` an object that contains css properties | _**Optional**_

`customBG` an object that contains css properties | _**Optional**_

#### About Modal Id

* if you don't pass it default is 'new-modal'
* To display the modal we use reactPortal, react portal create a brand-new element below your main wrapper (#root) 
* if you want your modal to always be on top of your html tree, you can create a div in your index.html and give it an id.
* Now, if you pass the same id to the `modalId` prop, it will target it and won't create a new div.

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
