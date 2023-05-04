'use strict';

const Jimp  = require('jimp'),
      {PNG} = require('pngjs');

const Point  = require('./point'),
      Voxel  = require('./voxel'),
      deskew = require('~/lib/deskew');

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

function unserializeCuboidFace(name, response)
{
  name = `[${name}]<br/>`;

  const valueKey = 'Valeur=',
        tailKey  = '<br/>';

  const keyPos   = response.indexOf(name) + name.length,
        valuePos = response.indexOf(valueKey, keyPos) + valueKey.length,
        tailPos  = response.indexOf(tailKey, valuePos);

  return PNG.sync.read(response.slice(valuePos, tailPos));
}

function unserializeCuboidFaces(response, frontFaceName, leftFaceName)
{
  const frontFace = unserializeCuboidFace(frontFaceName, response),
        leftFace  = unserializeCuboidFace(leftFaceName, response);

  return {frontFace, leftFace};
}

function getPixelMap(img)
{
  const result = {};

  for(let y = 0; y < img.height; ++y)
  for(let x = 0; x < img.width;  ++x)
  {
    const color = getPixel(img, x, y);

    if(color !== 0xffffff)
    {
      result[color] = new Point(x, y);
    }
  }

  return result;
}

function getVoxels(frontFace, leftFace)
{
  frontFace = getPixelMap(frontFace);
  leftFace  = getPixelMap(leftFace);

  let width  = 0,
      height = 0,
      minX   = Number.MAX_SAFE_INTEGER,
      minY   = Number.MAX_SAFE_INTEGER;

  const data = [];

  for(const [color, point] of Object.entries(frontFace))
  {
    if(color in leftFace)
    {
      const z = leftFace[color].x;

      data.push(new Voxel(point.x, point.y, z, color));

      width  = Math.max(width, point.x + 1);
      height = Math.max(height, z + 1);

      minX = Math.min(minX, point.x);
      minY = Math.min(minY, z);
    }
  }

  return {data, width, height, minX, minY};
}

function renderCaptcha(voxels)
{
  const img = new PNG
  ({
    width:  voxels.width  - voxels.minX,
    height: voxels.height - voxels.minY
  });

  for(let y = 0; y < img.height; ++y)
  for(let x = 0; x < img.width;  ++x)
  {
    setPixel(img, x, y, 0xffffff);
  }

  for(const voxel of voxels.data)
  {
    const x = voxel.x - voxels.minX,
          y = voxel.z - voxels.minY;

    setPixel(img, x, y, voxel.color);
  }

  return img;
}

async function getNormalizedCaptcha(img, padding = 50)
{
  img = new Jimp(img);

  for(let y = 0; y < img.bitmap.height; ++y)
  for(let x = 0; x < img.bitmap.width;  ++x)
  {
    if(img.getPixelColor(x, y) !== 0xffffffff)
    {
      img.setPixelColor(0x000000ff, x, y);
    }
  }

  const deskewAngle = await deskew(img);

  img.background(0xffffffff);
  img.scale(4, Jimp.RESIZE_BEZIER);
  img.rotate(deskewAngle);
  img.blur(2);
  img.autocrop();

  const variant1 = new Jimp(img.bitmap.width  + padding * 2,
                            img.bitmap.height + padding * 2);

  for(let y = 0; y < variant1.bitmap.height; ++y)
  for(let x = 0; x < variant1.bitmap.width;  ++x)
  {
    variant1.setPixelColor(0xffffffff, x, y);
  }

  variant1.composite(img, padding, padding);

  const variant2 = variant1.clone().flip(true, true);

  const result =
  {
    variant1: await variant1.getBufferAsync(Jimp.MIME_PNG),
    variant2: await variant2.getBufferAsync(Jimp.MIME_PNG)
  };

  return result;
}

module.exports.getNormalized = async (response,
                                      frontFaceName = 'face',
                                      leftFaceName  = 'gauche') =>
{
  const {frontFace, leftFace} =
    unserializeCuboidFaces(response, frontFaceName, leftFaceName);

  const voxels  = getVoxels(frontFace, leftFace),
        captcha = renderCaptcha(voxels);

  return await getNormalizedCaptcha(captcha);
};
