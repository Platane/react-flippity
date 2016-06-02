
export const shuffle = a =>
    a.sort( (a,b) => Math.random() > 0.5 )

export const rotate = a =>
    a.length == 0
        ? []
        : [ ...a.slice(1), a[0] ]

export const rotateBack = a =>
    a.length == 0
        ? []
        : [ a[ a.length-1 ], ...a.slice(0,-1) ]

export const remove = ( a, index=0 ) =>
    a.filter( (_,i) => i==(index%a.length) )

export const add = ( a, x, index=0 ) => {
    const _a = a.slice()
    _a.splice( index, 0, x )
    return _a
}
