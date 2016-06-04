
import {steps}                      from './computeMotion'
import {create as createArray}      from './array'

const transform = ({ x, y, sx, sy }) => {
    const value = `translate3d(${ x }px, ${ y }px, 0) translate3d(${ -50*(1-sx) }%, ${ -50*(1-sy) }%,0) scale(${ sx },${ sy }) `
    return {
        transform: value,
        WebkitTransformtransform: value,
    }
}

const merge = ( steps ) =>
    createArray(
            Object.keys( steps )
                .reduce( (n,key) => Math.max( steps[ key ].length, n ), 0 )
        )
        .map( (_,i) => {

            const o = {}

            for( let key in steps )
                o[ key ] = i < steps[ key ].length
                    ? steps[ key ][ i ]
                    : steps[ key ][ steps[ key ].length-1 ]

            return o
        })


export const animationSteps = ( source, velocity, target, ...options ) =>

    merge(
        Object.keys( source )
            .reduce( (o, key) => {

                o[key] = steps( source[ key ], velocity[ key ], target[ key ], ...options )

                return o
            }, {} )
    )
        .map( transform )
