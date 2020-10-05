# Deskew
Deskew performs automatic text skew detection and correction. It is
built on top of [Jimp](https://github.com/oliver-moran/jimp).

Deskew works on the basis of line detection using the
[Hough transform](https://en.wikipedia.org/wiki/Hough_transform#Theory) in the rho-theta space.

# Installation
Using [npm](https://www.npmjs.com/package/deskew): `npm install deskew --save`

# Usage
```javascript
const deskew = require("deskew");

deskew("./example.png", {
  precision: 0.1,
  fillColour: 0x0000FFFF // Blue with no alpha transparency.
}).then(deskewedImage => {
  deskewedImage.writeAsync("./deskew.png");
});
```

# Options
precision - Determines the level of precision. Lower will give more accurate results but is more computationally expensive.

fillColour - After rotating an image, there will be locations that have no pixel data associated with them and so are instead made transparent. This option fills such locations with a particular colour.
