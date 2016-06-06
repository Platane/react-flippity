import React, { Component } from 'react'

import {acc, compute as computeSpring}      from './math'
import {transform}                          from './animation'

class Flippity extends Component {

    constructor(){
        super()

        this.state = {}
        this.transform = {}
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
     * use the saved old positions to compute the delta
     *
     */
    computeTargetPosition(){

        this.transform = {}

        console.log(
            Object.keys( this.refs )
                .map( key => key + ' ' + this.refs[ key ].getBoundingClientRect().left +' ' )
        )

        for ( let key in this.refs ) {

            const source = this.source[ key ]
            const box = this.refs[ key ].getBoundingClientRect()

            const origin = { x: box.left, y: box.top, width:box.width||1, height:box.height||1 }

            // if the source does not exist, that's means that the element have been added
            // in this case set the delta position to 0 ( no animation )
            this.transform[ key ] = source
                ? {
                    x   : source.x - origin.x,
                    y   : source.y - origin.y,
                    sx  : source.width / origin.width,
                    sy  : source.height / origin.height
                }
                : { x:0, y:0, sx:1, sy:1 }
        }



        this.source = null
    }

    componentWillReceiveProps( nextProps ) {
        this.shouldMesure = true
        this.shouldResetTransform = false
        this.computeStartingPosition()
    }

    componentWillUpdate(nextProps, nextState) {
        if ( this.shouldMesure || this.shouldResetTransform ) {

            requestAnimationFrame( this.componentHaveRender.bind( this ) )
        }
    }

    componentHaveRender() {

        if ( this.shouldMesure ) {

            this.shouldMesure = false
            this.shouldResetTransform = true

            this.computeTargetPosition()

            this.forceUpdate()

        } else if ( this.shouldResetTransform ){

            this.shouldResetTransform = false

            this.forceUpdate()
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
                                    ...( this.props.childStyle||{} ),
                                    ...( this.shouldMesure || this.shouldResetTransform
                                        ? {}
                                        : { transition : 'transform 6000ms linear' }
                                    ),
                                    ...( this.shouldResetTransform
                                        ? transform( this.transform[ child.key ] )
                                        : {}
                                    ),
                                }}
                                >{ child }</div>
                        )
                }
            </div>
        )
    }

}

export default Flippity
