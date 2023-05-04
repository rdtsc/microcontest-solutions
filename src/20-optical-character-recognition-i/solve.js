#!/usr/bin/env node

'use strict';

const Jimp  = require('jimp'),
      {PNG} = require('pngjs'),
      maxBy = require('lodash.maxby');

const {solve}   = require('~/lib/mc'),
      tesseract = require('~/lib/tesseract');

const getPixel = (img, x, y) =>
  img.data[(img.width * y + x) * 4 + 0] << 16 |
  img.data[(img.width * y + x) * 4 + 1] <<  8 |
  img.data[(img.width * y + x) * 4 + 2] <<  0 ;

const setPixel = (img, x, y, rgb) =>
{
  img.data[(img.width * y + x) * 4 + 0] = (rgb >> 16) & 0xff;
  img.data[(img.width * y + x) * 4 + 1] = (rgb >>  8) & 0xff;
  img.data[(img.width * y + x) * 4 + 2] = (rgb >>  0) & 0xff;
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

function getCaptchaBackground(img)
{
  const histogram = getHistogram(img);

  return +maxBy(Object.keys(histogram), rgb => histogram[rgb]);
}

async function normalizeCaptcha(img)
{
  const bg = getCaptchaBackground(img);

  for(let y = 0; y < img.height; ++y)
  for(let x = 0; x < img.width;  ++x)
  {
    const pixel = getPixel(img, x, y);

    setPixel(img, x, y, pixel === bg ? 0xffffff : 0x000000);
  }

  img = new Jimp(img);

  img.scale(2, Jimp.RESIZE_BEZIER);
  img.blur(1);

  return img.getBufferAsync(Jimp.MIME_PNG);
}

(async () =>
{
  const ocr = await tesseract();

  await solve(20, async ({hex}) =>
  {
    hex = Buffer.from(hex.replace(/\s/g, ''), 'hex');

    const img = await normalizeCaptcha(PNG.sync.read(hex));

    const {data: {text}} = await ocr.recognize(img);

    return {text: text.trim()};
  });

  await ocr.terminate();
})();
