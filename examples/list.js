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
    item: {
        margin: 20,
    }
}
const List = ({ items, resize }) =>
(
    <Flippity style={ style.list } className="list" childClassName="item" childStyle={ style.item } stiffness={ 50 } damping={ 16 } >
        {
            () => items.map( x =>
                <Item key={ x.id } {...x} resize={resize} />
            )
        }
    </Flippity>
)

export default List
