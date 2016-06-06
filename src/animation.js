
import {compute}                    from './math'
import {create as createArray}      from './array'

const transform = ({ x, y, sx, sy }) => {
    const value = `translate3d(${ x }px, ${ y }px, 0) translate3d(${ -50*(1-sx) }%, ${ -50*(1-sy) }%,0) scale(${ sx },${ sy }) `
    return {
        transform: value,
        WebkitTransformtransform: value,
    }
}

const steps = ( x0, v0, target, k, b, precision, period ) => {

    const c = compute( k, b )( x0 - target, v0 )

    const arr = []
    let x = null
    let v = null
    let t = 0

    do {

        x = c.x( t )
        v = c.v( t )

        t = t + period

        arr.push( target + x )

    }while( Math.abs( v ) > precision || Math.abs( x ) > precision )

    return arr
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


export const animationSteps = ( source, velocity, target, k, b, precision, period ) =>

    merge(
        Object.keys( source )
            .reduce( (o, key) => {

                o[key] = steps( source[ key ], velocity[ key ], target[ key ], k, b, key[0] == 's' ? precision / 100 : precision, period )

                return o
            }, {} )
    )
        .map( transform )
