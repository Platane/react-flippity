
export const acc = ( k, b, x, v, target ) =>
    - k * ( x - target ) - b * v

export const cold = ( precision, p, target, v ) =>
       Math.abs( v.x ) < precision
    && Math.abs( v.y ) < precision
    && Math.abs( p.x - target.x ) < precision
    && Math.abs( p.y - target.y ) < precision
