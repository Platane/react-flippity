import React from 'react'

const style = {
    container: {
        display: 'flex',
        marginLeft: 50,
        flexWrap: 'wrap',
    },
}

const Menu = ({ items,  add, add100, remove, shuffle, rotate, rotateBack, randomSize, setResizable, resizable }) =>
(
    <div style={ style.container } >
        <button onClick={ add } >add one</button>
        <button onClick={ add100 } >add 100</button>
        <button onClick={ remove } >remove one</button>
        <button onClick={ shuffle } >shuffle</button>
        <button onClick={ rotate } >rotate</button>
        <button onClick={ rotateBack } >rotate back</button>
        <button onClick={ randomSize } >random size</button>
        <input type="checkbox" checked={resizable} onChange={ event => setResizable(event.target.checked) } />
        <span>{ items.length }</span>
    </div>
)

export default Menu
