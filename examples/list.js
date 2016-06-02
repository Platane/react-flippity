import React, { Component } from 'react'
import Flipity              from '../src/index'


const style = {
    list: {
        display: 'flex',
        flexDirection: 'row',
        width: '60%',
        marginRight: 'auto',
        marginLeft: 'auto',
        flexWrap: 'wrap',
    },
    item: {
        width: 50,
        height: 50,
        margin: 25,
    },
}
const color = [
    '#243123',
    '#ab423e',
    '#3eab42',
    '#d49e24',
    '#796026',
    '#267975',
]
const List = ({ items }) =>
(
    <Flipity listStyle={ style.list }>
        {
            () => items.map( x =>
                <div key={ x.id}>
                    <div style={{ ...style.item, backgroundColor: color[ x.id % color.length ] }} />
                </div>
            )
        }
    </Flipity>
)

export default List
