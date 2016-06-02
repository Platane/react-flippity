
const k = 0.01
const b = 0.15

export const acc = ( x, v, target ) =>
    - k * ( x - target ) - b * v
