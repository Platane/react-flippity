# react-flippity


![moss it crowd](https://raw.githubusercontent.com/Platane/react-flippity/master/asset/moss.js)

>_You think it's a flippin' game?_

Animate list of elements using FLIP trick.

[demo](http://Platane.github.io/react-flippity/)

## Usage

> TODO publish to npm

same API as the brilliant [react-motion-flip](https://github.com/bloodyowl/react-motion-flip)

```javascript
<div>

 <Flippity>

  () =>
   items.map( item =>  <MyItemComponent key={item.key} {...x} />

 </Flippity>

</div>
```

For every change in the `items` list, Flippity will make a nice transition to the new layout.

### Styling

The code below will produce this markup:

```html
<div>

  <div> <!-- the flippity container -->

   <div> <MyItemComponent /> </div>  <!-- one wrapper around each item -->
   <div> <MyItemComponent /> </div>
   <div> <MyItemComponent /> </div>

 </div>  

</div>
```

You might want to custom the style of the container or the item wrapper.

This can be achieved by passing `style`, `childStyle` and `className`, `childClassName`.

### Spring physic

The physic spring can be customized with the props `stiffness`, `damping` and `precision`.


## References

 - [FLIP animation technique](https://aerotwist.com/blog/flip-your-animations/) by [__@paullewis__](https://github.com/paullewis), which allows to easily make transition between two state, relying on the browser computation layout.
 - [react-motion](https://github.com/chenglou/react-motion) by [__@chenglou__](https://github.com/chenglou), from which I borrowed the spring physic based animation.
 - [react-motion-flip](https://github.com/bloodyowl/react-motion-flip) by [__@bloodyowl__](https://github.com/bloodyowl), which use clever tricks.


 - [The IT Crowd](https://www.youtube.com/watch?v=TwJheWwW7rw) for getting stuck in my head the whole time.


## TODO

- [ ] publish to npm
- [ ] compute acceleration based on actual time ( not n of frame )
- [ ] animate width and height
- [ ] test :tropical_fish:
- [ ] animate with webAnimation API
