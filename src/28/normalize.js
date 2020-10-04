'use strict';

const {PNG} = require('pngjs'),
      maxBy = require('lodash.maxby');

const getPixel = (img, x, y) =>
  img.data[(img.width * y + x) * 4 + 0] << 16 |
  img.data[(img.width * y + x) * 4 + 1] <<  8 |
  img.data[(img.width * y + x) * 4 + 2] <<  0 ;

const setPixel = (img, x, y, rgb) =>
{
  img.data[(img.width * y + x) * 4 + 0] = (rgb >> 16) & 0xff;
  img.data[(img.width * y + x) * 4 + 1] = (rgb >>  8) & 0xff;
  img.data[(img.width * y + x) * 4 + 2] = (rgb >>  0) & 0xff;
  img.data[(img.width * y + x) * 4 + 3] = 0xff;
};

function getHistogram(img)
{
  const histogram = {};

  for(let y = 0; y < img.height; ++y)
  for(let x = 0; x < img.width;  ++x)
  {
    const rgb = getPixel(img, x, y);

    if(!(rgb in histogram))
    {
      histogram[rgb] = 0;
    }

    ++histogram[rgb];
  }

  return histogram;
}

function getBackground(img)
{
  const histogram = getHistogram(img);

  return +maxBy(Object.keys(histogram), rgb => histogram[rgb]);
}

module.exports = (img) =>
{
  img = PNG.sync.read(img);

  const stockBackground = getBackground(img);

  const result = new PNG({width: img.width, height: img.height});

  const background = 0xffffff,
        foreground = 0x000000;

  const crossOffsets =
  [
    {x: -1, y: +0},
    {x: +1, y: +0},
    {x: +0, y: -1},
    {x: +0, y: +1}
  ];

  for(let y = 0; y < img.height; ++y)
  for(let x = 0; x < img.width;  ++x)
  {
    const pixel = getPixel(img, x, y);

    setPixel(result, x, y, pixel === stockBackground ? background : foreground);
  }

  for(let y = 1; y < img.height - 1; ++y)
  for(let x = 1; x < img.width  - 1; ++x)
  {
    if(getPixel(result, x, y) === background)
    {
      const isAliasingArtifact = crossOffsets.every((offset) =>
        getPixel(result, x + offset.x, y + offset.y) === foreground);

      if(isAliasingArtifact)
      {
        setPixel(result, x, y, foreground);
      }
    }
  }

  return PNG.sync.write(result);
};
