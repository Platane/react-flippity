
jest
    .unmock('../math')

const {compute} = require('../math')

const epsylon = 0.0001

const equal = ( x , t ) =>
    Math.abs( x - t ) < epsylon
        ? expect( t ).toBe( t )
        : expect( x ).toBe( t )

const zero = x => equal( x, 0 )

describe('compute spring equation', () => {

    describe('oscillator amortized solutions ( delta < 0)', () => {

        const k = 0.01
        const b = 0.15

        it('x0 = 0, v0 = 0', () => {

            const {x,v} = compute( k, b )( 0, 0 )

            zero( x(0) )
            zero( x(1) )
            zero( x(10) )

            zero( v(0) )
            zero( v(1) )
            zero( v(10) )
        })

        it('x0 = 3, v0 = 0', () => {

            const {x,v} = compute( k, b )( 3, 0 )

            // initial condition ok
            equal( x(0), 3 )
            zero( v(0) )

            // zero when t tends to infinity
            zero( x(1000000) )
            zero( v(1000000) )
        })

        it('x0 = 3, v0 = 0.1', () => {

            const {x,v} = compute( k, b )( 3, 0.1 )

            // initial condition ok
            equal( x(0), 3 )
            equal( v(0), 0.1 )

            // zero when t tends to infinity
            zero( x(1000000) )
            zero( v(1000000) )
        })
    })

    describe('critic solutions ( delta = 0 )', () => {

        const k = 1
        const b = 2

        it('x0 = 0, v0 = 0', () => {

            const {x,v} = compute( k, b )( 0, 0 )

            zero( x(0) )
            zero( x(1) )
            zero( x(10) )

            zero( v(0) )
            zero( v(1) )
            zero( v(10) )
        })

        it('x0 = 3, v0 = 0', () => {

            const {x,v} = compute( k, b )( 3, 0 )

            // initial condition ok
            equal( x(0), 3 )
            zero( v(0) )

            // zero when t tends to infinity
            zero( x(1000000) )
            zero( v(1000000) )
        })

        it('x0 = 3, v0 = 0.1', () => {

            const {x,v} = compute( k, b )( 3, 0.1 )

            // initial condition ok
            equal( x(0), 3 )
            equal( v(0), 0.1 )

            // zero when t tends to infinity
            zero( x(1000000) )
            zero( v(1000000) )
        })
    })

    describe(' ( delta > 0 )', () => {

        const k = 1
        const b = 3

        it('x0 = 0, v0 = 0', () => {

            const {x,v} = compute( k, b )( 0, 0 )

            zero( x(0) )
            zero( x(1) )
            zero( x(10) )

            zero( v(0) )
            zero( v(1) )
            zero( v(10) )
        })

        it('x0 = 3, v0 = 0', () => {

            const {x,v} = compute( k, b )( 3, 0 )

            // initial condition ok
            equal( x(0), 3 )
            zero( v(0) )

            // zero when t tends to infinity
            zero( x(1000000) )
            zero( v(1000000) )
        })

        it('x0 = 3, v0 = 0.1', () => {

            const {x,v} = compute( k, b )( 3, 0.1 )

            // initial condition ok
            equal( x(0), 3 )
            equal( v(0), 0.1 )

            // zero when t tends to infinity
            zero( x(1000000) )
            zero( v(1000000) )
        })
    })
})
