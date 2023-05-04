'use strict';

const Jimp       = require('jimp'),
      {PNG}      = require('pngjs'),
      minBy      = require('lodash.minby'),
      pixelMatch = require('pixelmatch');

function getTiles(puzzle, borderWidth)
{
  const img = new Jimp(PNG.sync.read(puzzle.img));

  const tileWidth  = img.bitmap.width  / puzzle.cols,
        tileHeight = img.bitmap.height / puzzle.rows;

  const result = [];

  for(let y = 0; y < puzzle.rows; ++y)
  for(let x = 0; x < puzzle.cols; ++x)
  {
    const id   = puzzle.cols * y + x,
          tile = new Jimp(tileWidth, tileHeight);

    const srcPosX = x * tileWidth,
          srcPosY = y * tileHeight;

    tile.blit(img, 0, 0, srcPosX, srcPosY, tileWidth, tileHeight);

    const border =
    {
      top:    new Jimp(tileWidth,   borderWidth),
      right:  new Jimp(borderWidth, tileHeight),
      bottom: new Jimp(tileWidth,   borderWidth),
      left:   new Jimp(borderWidth, tileHeight),
    };

    const blit = (dst, x, y, w, h) =>
      dst.blit(tile, 0, 0, x, y, w, h);

    blit(border.top, 0, 0, tileWidth, borderWidth);
    blit(border.right, tileWidth - borderWidth, 0, borderWidth, tileHeight);
    blit(border.bottom, 0, tileHeight - borderWidth, tileWidth, borderWidth);
    blit(border.left, 0, 0, borderWidth, tileHeight);

    result.push({id, tile, border});
  }

  return result;
}

function getMismatch(a, b, threshold = 0.1)
{
  const {width, height} = a.bitmap;

  a = a.bitmap.data;
  b = b.bitmap.data;

  return pixelMatch(a, b, null, width, height, threshold);
}

function getNeighbors(tile, tiles, similarityThreshold)
{
  const result = {};

  const x = [], y = [];

  for(const candidate of tiles) if(tile.id !== candidate.id)
  {
    const deltaX = getMismatch(tile.border.top, candidate.border.bottom),
          deltaY = getMismatch(tile.border.left, candidate.border.right);

    x.push({delta: deltaX, a: tile.id, b: candidate.id});
    y.push({delta: deltaY, a: tile.id, b: candidate.id});
  }

  const minX = minBy(x, path => path.delta),
        minY = minBy(y, path => path.delta);

  if(minX.delta <= similarityThreshold)
  {
    result.top = minX.b;
  }

  if(minY.delta <= similarityThreshold)
  {
    result.left = minY.b;
  }

  return result;
}

function getTileMap(tiles)
{
  const result = {};

  for(const tile of tiles)
  {
    result[tile.id] = getNeighbors(tile, tiles, 25);
  }

  return result;
}

function hasSingleSource(tileMap)
{
  const sourceTileCount = Object.values(tileMap)
                                .filter(obj => !Object.keys(obj).length)
                                .length;

  return sourceTileCount === 1;
}

function getUnscrambled(tiles, tileMap)
{
  if(!hasSingleSource(tileMap))
  {
    return null;
  }

  let rowBeginId = Object.entries(tileMap)
                         .find(tile => !Object.keys(tile[1]).length)[0];

  const result = [rowBeginId];

  for(let i = 0; i < tiles.length; ++i)
  {
    const lastId = result[result.length - 1];

    const leftTile = Object.entries(tileMap)
                           .find(([id, tiles]) => tiles.left == lastId);

    if(leftTile)
    {
      result.push(leftTile[0]);

      continue;
    }

    const nextRowTile = Object.entries(tileMap)
                              .find(([id, tiles]) => tiles.top == rowBeginId);

    if(nextRowTile)
    {
      result.push(rowBeginId = nextRowTile[0]);
    }
  }

  if(result.length !== tiles.length || new Set(result).size !== tiles.length)
  {
    return null;
  }

  return result.map(id => +id + 1);
}

module.exports = (puzzle) =>
{
  const tiles   = getTiles(puzzle, 1),
        tileMap = getTileMap(tiles);

  return getUnscrambled(tiles, tileMap);
};
