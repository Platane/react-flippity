import React, { Component } from 'react'
import Flipity              from '../src/index'
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
    <Flipity listStyle={ style.list }>
        {
            () => items.map( x =>
                <Item key={ x.id } {...x} resize={resize} />
            )
        }
    </Flipity>
)

export default List
