import React, { Component } from 'react'
import Flippity             from '../src/index'
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
    <div style={{ position: 'relative'}}>

        <div style={{ ...style.list, position: 'absolute', top:0,  left:'20%', opacity:0.1 }} className="list" >
            {
                items.map( x =>
                    <div key={ x.id } style={ style.item }>
                        <Item key={ x.id } {...x} />
                    </div>

                )
            }
        </div>

        <Flippity.WithTransition style={ style.list } className="list" childClassName="item" childStyle={ style.item } stiffness={ 50 } damping={ 16 } >
            {
                () => items.map( x =>

                    <Item key={ x.id } {...x} resize={resize} />
                )
            }
        </Flippity.WithTransition>

    </div>
)

export default List
