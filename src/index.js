import React, { Component, Children } from "react"

import {acc, cold}     from './computeMotion'

const transform = ({ x, y }) =>
    ({
        transform: `translate3d(${ x }px, ${ y }px, 0)`,
        WebkitTransform: `translate3d(${ x }px, ${ y }px, 0)`,
    })

class Flippity extends Component {

    constructor(){
        super()

        this.state = {
            animationRunning : false,
            positions   : {},
            velocities  : {}
        }

        // to kill the request animation frame
        this.killAnimationFrame = null
    }

    /**
     * step the physical world,
     * update the positions and velocities
     * also set the value animationRunning
     *
     */
    step(){

        let animationRunning = false
        const positions     = this.state.positions
        const velocities    = this.state.velocities

        const precision     = this.props.precision || 0.1
        const stiffness     = this.props.stiffness || 0.01
        const damping       = this.props.damping || 0.15

        // for each item, step the position
        for ( let key in positions ) {

            const v     = velocities[ key ]
            const p     = positions[ key ]

            // compute the acceleration on the x axis ( the position target is 0,0 )
            v.x += acc( stiffness, damping, p.x, v.x, 0 )
            v.y += acc( stiffness, damping, p.y, v.y, 0 )

            // step the position
            p.x += v.x
            p.y += v.y

            // consider the animation done when every item is "cold"
            // meaning the velocity is null, and the position is on the target ( which is 0 )
            animationRunning = animationRunning || !cold( precision, p, {x:0,y:0}, v )
        }

        // ask for re-render
        this.setState({
            animationRunning,
            velocities,
            positions : animationRunning ? positions : {}
        })

        // animation loop
        if ( animationRunning ) {
            cancelAnimationFrame( this.killAnimationFrame )
            this.killAnimationFrame = requestAnimationFrame( this.step.bind( this ) )
        }
    }

    /**
     * should be called at the start of an animation, when the elements are still in the old positions
     * save the positions to compute the delta later
     *
     */
    computeStartingPosition(){
        this.source = {}

        for ( let key in this.refs ) {

            const box = this.refs[ key ].getBoundingClientRect()

            this.source[ key ] = {
                x: box.left,
                y: box.top,
            }
        }
    }

    /**
     * should be called after the reflow, when the elements are in the desired positions
     * use the saved old positions to compute the delta,
     * also set the velocity if the item have been added, keep the same if it exists before
     *
     */
    computeTargetPosition(){

        const positions  = {}
        const velocities = {}

        for ( let key in this.refs ) {

            const source = this.source[ key ]
            const box = this.refs[ key ].getBoundingClientRect()

            const origin = { x: box.left, y: box.top }

            // if the source does not exist, that's means that the element have been added
            // in this case set the delta position to 0 ( no animation )
            positions[ key ] = source
                ? { x:source.x - origin.x, y:source.y - origin.y }
                : {x:0, y:0}

            velocities[ key ] = this.state.velocities[ key ] || {x:0, y:0}
        }

        this.source = null

        this.setState({ positions, velocities })
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
        }
    }

    render(){

        const renderedChildren = this.props.children( this.state )
        return (
            <div style={this.props.style} className={this.props.className} >
                {
                    renderedChildren
                        .map( child =>
                            <div

                                key={child.key}
                                ref={child.key}
                                className={this.props.childClassName}
                                style={{
                                    ...(this.props.childStyle||{}),
                                    ...(
                                        this.shouldMesure || !this.state.animationRunning
                                            ? {}
                                            : transform( this.state.positions[child.key]||{x:0,y:0} )
                                    )
                                }}
                                >{ child }</div>
                        )
                }
            </div>
        )
    }

}

export default Flippity
