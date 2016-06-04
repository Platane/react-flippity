import {create as createArray}      from './array'

export const acc = ( k, b, x, v, target ) =>
    - k * ( x - target ) - b * v

const VELOCITY = 200 // px/s
export const steps = ( x, v, target,  k, b, precision, period ) =>

    createArray( 0 | Math.abs(( target - x ) / ( VELOCITY / 1000 * period )  ) +1 )
        .map( (_,i,arr) =>
            arr.length == 1
                ? target
                : (i/(arr.length-1)) * ( target - x ) + x
        )
