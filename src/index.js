import React, { Component, Children } from "react"

import {acc, compute as computeSpring}      from './math'
import {animationSteps}                     from './animation'

const velocityInstant = ( stiffness, damping, x0, v0, target, t ) =>
    ({
        x : computeSpring( stiffness, damping )( x0.x - target.x, v0.y ).v( t ),
        y : computeSpring( stiffness, damping )( x0.y - target.y, v0.y ).v( t ),
        sx : computeSpring( stiffness, damping )( x0.sx - target.sx, v0.sx ).v( t ),
        sy : computeSpring( stiffness, damping )( x0.sy - target.sy, v0.sy ).v( t ),
    })

class Flippity extends Component {

    constructor(){
        super()

        this.state = {}

        this.kill = {}
        this.animations = {}
        this.startDate = null

        // to kill the request animation frame
        this.killAnimationFrame = null
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
                x       : box.left,
                y       : box.top,
                width   : box.width,
                height  : box.height,
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

        const precision     = this.props.precision || 0.5
        const stiffness     = this.props.stiffness || 0.01
        const damping       = this.props.damping || 0.15
        const period        = this.props.period || 50

        const now   = Date.now()
        const t     = now - (this.startDate || 0)
        this.startDate = now

        for ( let key in this.refs ) {

            const source = this.source[ key ]
            const box = this.refs[ key ].getBoundingClientRect()

            const origin = { x: box.left, y: box.top, width:box.width||1, height:box.height||1 }

            // if the source does not exist, that's means that the element have been added
            // in this case set the delta position to 0 ( no animation )
            const position = source
                ? {
                    x   : source.x - origin.x,
                    y   : source.y - origin.y,
                    sx  : source.width / origin.width,
                    sy  : source.height / origin.height
                }
                : { x:0, y:0, sx:1, sy:1 }

            // compute the instant velocity
            // or init it at null
            const velocity = this.animations[ key ] && velocityInstant(
                stiffness,
                damping,
                this.animations[ key ].x0,
                this.animations[ key ].v0,
                {x:0, y:0, sx:1, sy:1},
                t/1000
            ) || {x:0, y:0, sx:0, sy:0}

            // compute the animation steps ( as array of css style )
            const steps = animationSteps( position, velocity, {x:0, y:0, sx:1, sy:1}, stiffness, damping, precision, period/1000 )

            // if the animation is needed
            if ( steps.length > 1 ) {

                // run the animation
                this.kill[ key ] = this.refs[ key ].animate( steps, steps.length * period )

                // hold the params, in order to compute the velocity later
                this.animations[ key ] = { x0:position, v0:velocity }
            }
        }

        this.source = null
    }

    componentWillReceiveProps( nextProps ) {
        this.shouldMesure = true
        this.computeStartingPosition()
    }

    componentWillUpdate(nextProps, nextState) {
        if ( this.shouldMesure ) {

            for ( let key in this.refs )
                this.kill[ key ] && this.kill[ key ].cancel()

            requestAnimationFrame( this.componentHaveRender.bind( this ) )
        }
    }

    componentHaveRender() {

        if ( this.shouldMesure ) {

            this.shouldMesure = false

            this.computeTargetPosition()

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
                                style={this.props.childStyle}
                                >{ child }</div>
                        )
                }
            </div>
        )
    }

}

export default Flippity
