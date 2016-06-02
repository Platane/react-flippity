import React, { Component } from 'react'
import Flippity              from '../src/index'
import Item                 from './item'


const style = {
    list: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%',
        marginRight: 'auto',
        marginLeft: 'auto',
        flexWrap: 'wrap',
    },
}
const List = ({ items, resize }) =>
(
    <Flippity listStyle={ style.list } stiffness={ 0.01 } damping={ 0.15 } >
        {
            () => items.map( x =>
                <Item key={ x.id } {...x} resize={resize} />
            )
        }
    </Flippity>
)

export default List
