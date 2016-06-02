import React, { Component } from 'react'
import ReactDOM             from 'react-dom'
import List                 from './list'
import Menu                 from './menu'

import "./index.html"

class App extends Component {

    constructor(){
        super()

        this.state = { items:[{id:1},{id:2},{id:3},{id:4}] }

        this.methods = {
            shuffle : () =>
                this.setState({
                    items: this.state.items.sort( (a,b) => Math.random() > 0.5 )
                })
            ,

            rotate  : () =>
                this.setState({
                    items: this.state.items.length == 0
                        ? []
                        : [ ...this.state.items.slice(1), this.state.items[0] ]
                })
            ,

            rotateBack  : () =>
                this.setState({
                    items: this.state.items.length == 0
                        ? []
                        : [ this.state.items[this.state.items.length-1], ...this.state.items.slice(0,-1) ]
                })
            ,

            addOne  : () =>
                this.setState({ items: [ {id:this.state.items.reduce((i,x) => Math.max(i,x.id),0)+1}, ...this.state.items] })
            ,

            removeOne  : () =>
                this.setState({
                    items: this.state.items.length == 0
                        ? []
                        : this.state.items.slice( 1 )
                    })
        }
    }

    render(){
        return (
            <div>
                <Menu { ...this.methods }/>
                <List { ...this.state } />
            </div>
        )
    }

}


ReactDOM.render( <App />, document.getElementById("app") )
