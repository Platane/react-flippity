import {create as createArray}      from './array'

// precision
const epsylon = 0.0001

/**
 *
 * compute the instant acceleration
 *
 */
export const acc = ( k, b, x, v, target ) =>
    - k * ( x - target ) - b * v

/**
 *
 * solve the spring motion equation
 *
 */
export const compute = ( k, b ) => {

    // solve the differencial equation
    // x'' + b x' + k x = 0

    const det = b*b -4*k

    if ( det < -epsylon ) {
        // solution have the form of x( t ) = q e( u t ) sin ( v t + r )
        // which means x'( t ) = q e ( u t ) ( u sin ( v t + r ) + v cos ( v t + r ) )

        // real part
        const u = - b / 2

        // im part
        const v =  Math.sqrt( - det )

        return ( x0, v0 ) => {

            // use condition at t=0 to write the folowing
            // v0 = q u e ( u * 0 ) sin ( v * 0 + r ) + q v e ( u * 0 ) cos ( v * 0 + r ) )
            // x0 = q e ( u * 0 ) sin ( v * 0 + r)

            // reduce ..
            // v0 = q u * sin( r ) + q v cos( r ) )
            // x0 = q sin( r )

            // replace sin ( r ) in (2)
            // q != 0  | sin ( r ) = x0 / q
            //         | v0 = u x0 + q v cos ( r )

            // square the two expression to form cos ^2 + sin ^2
            // v != 0  | sin ( r ) ^2 = ( x0 / q ) ^2
            //         | cos ( r ) ^2 = ( v0 - u x0 ) ^2 / ( q v ) ^2
            //notice that det < 0 => v > 0


            // with 1 = cos( k )^2 + sin( k )^2
            // 1 = ( ( x0 v ) ^2 + ( v0 - u x0 ) ^2 ) / ( q v ) ^2

            // q = ( 1/v ) sqrt(  ( x0 v ) ^2 + ( v0 - u x0 ) ^2 )


            const q = 1/v * Math.sqrt( x0*x0 * v*v + Math.pow( v0 - u * x0 , 2 ) )

            const r = q == 0
                ? 0
                : Math.asin( x0 / q )

            return {
                x : t =>
                    q * Math.exp( u * t ) * Math.sin( v * t + r )
                ,
                v : t =>
                    q * Math.exp( u * t ) * ( u * Math.sin( v * t + r ) + v * Math.cos( v * t + r ) )
            }
        }

    } else if ( det > epsylon ) {
        // solution have the form of x( t ) = C1 e ( u1 t ) + C2 e ( u2 t )
        // which means x'( t ) = u1 C1 e ( u1 t ) + u2 C2 e ( u2 t )

        const w = Math.sqrt( det )
        const u1 = ( - b + w ) / 2
        const u2 = ( - b - w ) / 2

        return ( x0, v0 ) => {

            // C1 + C2 = x0
            // u1 C1 + u2 C2 = v0

            const C1 = ( v0 - u2 * x0 ) / ( u1 - u2 )
            const C2 = x0 - C1

            return {
                x : t =>
                    C1 * Math.exp( u1 * t ) + C2 * Math.exp( u2 * t )
                ,
                v : t =>
                    u1 * C1 * Math.exp( u1 * t ) + u2 * C2 * Math.exp( u2 * t )
            }
        }

    } else {
        // solution have the form of x( t ) = e ( u t ) ( A t + b )
        // which means x'( t ) = u e ( u t ) ( A t + B ) + A e ( u t )

        const u = -b / 2

        return ( x0, v0 ) => {

            // x0 = B
            // v0 = A + u B

            const B = x0

            const A = v0 - B * u

            return {
                x : t =>
                    Math.exp( u * t ) * ( A * t + B )
                ,
                v : t =>
                    Math.exp( u * t ) * ( A + ( A * t + B ) * u )
            }
        }
    }
}
