import React, { Component } from 'react'
import ReactDOM             from 'react-dom'
import List                 from './list'
import Menu                 from './menu'

import "./index.html"
import { shuffle, remove, add, rotate, rotateBack } from './arrayMethod'

class App extends Component {

    constructor(){
        super()

        this.state = {
            resizable: false,
            items:[
                {id:1, width: 50, height: 50},
                {id:2, width: 50, height: 50},
                // {id:3, width: 50, height: 50},
            ]
        }

        this.methods = {
            shuffle     : () => this.setState({ items: shuffle( this.state.items ) }),
            remove      : () => this.setState({ items: remove( this.state.items, 0|(Math.random() * 100) ) }),
            rotate      : () => this.setState({ items: rotate( this.state.items ) }),
            rotateBack  : () => this.setState({ items: rotateBack( this.state.items ) }),
            add         : () =>
                this.setState({
                    items: add(
                        this.state.items, {
                            id : this.state.items.reduce((max,item) => Math.max(item.id,max),1)+1,
                            width : 50,
                            height : 50,
                        }
                    )
                }),
            add100      : () => {
                const n = this.state.items.reduce((max,item) => Math.max(item.id,max),1)+1
                const items = this.state.items.slice()

                for ( let i=100; i--;)
                    items.push({ id: i+n, width:50, height:50 })
                this.setState({ items })

            },
            resize     : (id,size) => this.setState({
                items: this.state.items
                    .map(
                        item => item.id == id
                            ? {...item, ...size}
                            : item
                    )
            }),

            setResizable : (resizable) => this.setState({ resizable }),
            randomSize : () =>
                this.setState({
                    items: this.state.items.map( x =>
                        ({
                            ...x,
                            width : Math.random() * 150 + 30,
                            height : Math.random() * 150 + 30,
                        })
                    )
                }),
        }
    }

    render(){
        console.log( this.state.items.map( x => x.id ) )
        return (
            <div>
                <Menu { ...this.methods } { ...this.state } resizable={ this.state.resizable } />
                <List { ...this.state } resize={ this.state.resizable && this.methods.resize }  />
            </div>
        )
    }

}


ReactDOM.render( <App />, document.getElementById("app") )
