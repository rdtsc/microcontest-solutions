'use strict';

const assert = require('assert'),
      crypto = require('crypto');

const tileRegistry = require('./tiles');

const getPixel = (img, x, y) =>
  img.data[(img.width * y + x) * 4 + 0] << 16 |
  img.data[(img.width * y + x) * 4 + 1] <<  8 |
  img.data[(img.width * y + x) * 4 + 2] <<  0 ;

function getTileId(img, xOffset, yOffset, tileWidth, tileHeight)
{
  const xMax = xOffset + tileWidth,
        yMax = yOffset + tileHeight;

  const result = crypto.createHash('sha1');

  for(let y = yOffset; y < yMax; ++y)
  for(let x = xOffset; x < xMax; ++x)
  {
    result.update(getPixel(img, x, y).toString());
  }

  return result.digest('hex');
}

module.exports = (img) =>
{
  const tileWidth  = 200,
        tileHeight = 150;

  assert(!(img.width % tileWidth) && !(img.height % tileHeight));

  const xMax = img.width  / tileWidth,
        yMax = img.height / tileHeight;

  const result = [];

  for(let x = 0; x < xMax; ++x)
  for(let y = 0; y < yMax; ++y)
  {
    const xOffset = x * tileWidth,
          yOffset = y * tileHeight;

    const tileId = getTileId(img, xOffset, yOffset, tileWidth, tileHeight);

    if(!(tileId in tileRegistry))
    {
      throw new Error('Unknown tile.');
    }

    result.push(tileRegistry[tileId]);
  }

  return result;
};
