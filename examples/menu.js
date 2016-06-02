import React from 'react'

const style = {
    container: {
        display: 'flex',
        marginLeft: 50,
        flexWrap: 'wrap',
    },
}

const Menu = ({ add, remove, shuffle, rotate, rotateBack, setResizable, resizable }) =>
(
    <div style={ style.container } >
        <button onClick={ add } >add one</button>
        <button onClick={ remove } >remove one</button>
        <button onClick={ shuffle } >shuffle</button>
        <button onClick={ rotate } >rotate</button>
        <button onClick={ rotateBack } >rotate back</button>
        <button onClick={ rotateBack } >rotate back</button>
        <input type="checkbox" checked={resizable} onChange={ event => setResizable(event.target.checked) } />
    </div>
)

export default Menu
