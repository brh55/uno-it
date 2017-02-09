# uno-it [![Build Status](https://img.shields.io/travis/brh55/uno-it.svg?branch=master)](https://travis-ci.org/brh55/uno-it) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)

> Sum a string of multiple units into one single unit.
>
> **unoIt('cm in ft', 'ft') => ∑(ft)**

`uno-it` is built on top of [convert-unit](https://www.npmjs.com/package/convert-units) for its conversions. Unfortunately, `uno-it` currently doesn't account for significant figures *(soon to come)*, and is under the assumption that the inputs are of infinite precision.

## Install

```
$ npm install --save uno-it
```

## Usage

```js
const unoIt = require('uno-it');

unoIt('20ft 9cms 1 inch 200 m', 'm');
//=> 206.21

unoIt('90 ml 10l', 'l');
//=> 10.09

unoIt('90.17 kg 1 lb 100 g', 'kg');
//=> 90.72
```

## Possible Measurements
As long as the base of the measurements are defined, it will be evaluated properly.

`IE: ins == in`

- **mass:** mcg, mg, g, kg, oz, lb
- **volume:** ml, l, tsp, tbsp, fl-oz, cup, pnt, qt, gal
- **length:** mm, cm, m, in, ft, mi

## API

### unoIt(input, desiredUnit [, options])

#### input

Type: [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The string containing multiple units of the same type. `IE: "1 cup 10 qt 9 pnt 2 gal"

#### desiredUnit

Type: [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The desired unit to convert the string to.

### options

#### round

Type: [`<boolean>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)<br>
Default: `2`

The decimal value to round the result to.

#### type

Type: [`<string>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) *("volume", "mass", "length")*

By default `uno-it` will attempt to match the first value as the measurement type. However, for faster processing, the type can be specified.

## License

MIT © [Brandon Him](https://github.com/brh55)
