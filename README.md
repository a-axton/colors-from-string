## Colors from string
Just like the name, gets all occurrences of hex, rgb, rgba, hsl, hsla and css color names from a string.
### Installation
```npm install colors-from-string --save```
### Usage
```
var colorsFromString = require('colors-from-string');
var results = colorsFromString('#fff there is a hex, here is an rgb rgb(255,255,255) and a color name tomato');
// results
// [
//   {
//     match: '#fff',
//     type: 'hex',
//     index: 0
//   },
//   {
//     match: 'rgb(255,255,255)',
//     type: 'rgb',
//     index: 37
//   },
//   {
//     match: 'tomato',
//     type: 'keyword',
//     index: 71
//   }
// ]
```

## Building
#### Install
```npm install```

#### Dev
```npm run watch```

#### Test
```npm run test```

then go to: http://localhost:8080/webpack-dev-server

#### Build
```npm run build```
