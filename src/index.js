import React, { Component, Children } from "react"

import {acc}     from './computeMotion'

const transform = ({ x, y }) =>
    ({
        transform: `translate3d(${ x }px, ${ y }px, 0)`,
        WebkitTransform: `translate3d(${ x }px, ${ y }px, 0)`,
    })

class Flipity extends Component {

    constructor(){
        super()

        this.state = {}

        this.animationRunning = false
        this.killAnimationFrame = null

        this.pos    = {}
        this.v      = {}
    }

    step(){

        let running = false

        for ( let key in this.pos ) {

            const v = this.v[ key ]
            const pos = this.pos[ key ]

            v.x += acc( pos.x, v.x, 0 )
            v.y += acc( pos.y, v.y, 0 )

            pos.x += v.x
            pos.y += v.y

            if ( v.x < 0.1 && v.y < 0.1 && Math.abs( pos.x ) < 0.1 && Math.abs( pos.y ) < 0.1 ) {

                pos.x = 0
                pos.y = 0
                v.x = 0
                v.y = 0

            } else
                running = true

        }

        this.animationRunning = running

        this.forceUpdate()

        if ( running ) {
            cancelAnimationFrame( this.killAnimationFrame )
            this.killAnimationFrame = requestAnimationFrame( this.step.bind( this ) )
        }
    }

    computeStartingPosition(){
        this.source = {}

        Object.keys( this.refs )
            .forEach( key => {

                const box = this.refs[ key ].getBoundingClientRect()

                this.source[ key ] = {
                    x: box.left,
                    y: box.top,
                }
            })
    }

    computeTargetPosition(){
        this.pos    = {}
        const v     = {}

        Object.keys( this.refs )
            .forEach( key => {

                const source = this.source[ key ]
                const box = this.refs[ key ].getBoundingClientRect()

                const origin = { x: box.left, y: box.top }

                this.pos[ key ] = source
                    ? { x:source.x - origin.x, y:source.y - origin.y }
                    : {x:0, y:0}
                v[ key ] = this.v[ key ] || {x:0, y:0}
            })

        this.v = v
    }

    componentWillReceiveProps( nextProps ) {
        this.shouldMesure = true
        this.computeStartingPosition()
    }

    componentWillUpdate(nextProps, nextState) {
        if ( this.shouldMesure )
            requestAnimationFrame( this.componentHaveRender.bind( this ) )
    }

    componentHaveRender() {

        if ( this.shouldMesure ) {

            this.computeTargetPosition()

            this.shouldMesure = false
            this.step()
            return
        }
    }

    render(){

        const renderedChildren = this.props.children( this.state )

        return (
            <div style={this.props.listStyle} >
                {
                    renderedChildren
                        .map( child =>
                            <div
                                key={child.key}
                                ref={child.key}
                                style={{
                                    ...(
                                        this.shouldMesure || !this.animationRunning
                                            ? {}
                                            : transform( this.pos[child.key]||{x:0,y:0} )
                                    )
                                }}
                                >{ child }</div>
                        )
                }
            </div>
        )
    }

}

export default Flipity
