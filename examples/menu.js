import React from 'react'

const style = {
    container: {
        display: 'flex',
        marginLeft: 50,
        flexWrap: 'wrap',
    },
}

const Menu = ({ addOne, removeOne, shuffle, rotate, rotateBack }) =>
(
    <div style={ style.container } >
        <button onClick={ addOne } >add one</button>
        <button onClick={ removeOne } >remove one</button>
        <button onClick={ shuffle } >shuffle</button>
        <button onClick={ rotate } >rotate</button>
        <button onClick={ rotateBack } >rotate back</button>
        <button onClick={ rotateBack } >rotate back</button>
    </div>
)

export default Menu
