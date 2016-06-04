import React, { Component } from 'react'

const style = {
    item: {
        width: 50,
        height: 50,
        display: 'flex',
        flexDirection: 'column',
    },
    bar:{
        width: '80%',
        maxWidth: 50,
    }
}
const color = [
    '#243123',
    '#ab423e',
    '#3eab42',
    '#d49e24',
    '#796026',
    '#267975',
]
const Item = ({ resize, width, height, id }) =>
(
    <div style={{
            ...style.item,
            width,
            height,
            backgroundColor: color[ id % color.length ]
        }}>

        { resize &&
            <input style={style.bar} type="range" min={36} max={200} step={1} onChange={ event => resize(id,{width:+event.target.value}) } />
        }
        { resize &&
            <input style={style.bar} type="range" min={36} max={200} step={1} onChange={ event => resize(id,{height:+event.target.value}) } />
        }
    </div>
)

export default Item
