#!/usr/bin/env node

'use strict';

const cp    = require('child_process'),
      fs    = require('fs-extra'),
      temp  = require('temp'),
      {PNG} = require('pngjs'),
      maxBy = require('lodash.maxby');

const {solve} = require('~/lib/mc');

temp.track();

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

function normalizeCaptcha(img)
{
  const bg = getCaptchaBackground(img);

  for(let y = 0; y < img.height; ++y)
  for(let x = 0; x < img.width;  ++x)
  {
    const pixel = getPixel(img, x, y);

    setPixel(img, x, y, pixel === bg ? 0xffffff : 0x000000);
  }

  return img;
}

solve(20, ({hex}) =>
{
  hex = Buffer.from(hex.replace(/\s/g, ''), 'hex');

  const img     = normalizeCaptcha(PNG.sync.read(hex)),
        imgPath = temp.openSync({suffix: '.png'}).path;

  fs.writeFileSync(imgPath, PNG.sync.write(img));

  const result =
  {
    text: cp.execSync(`gocr -C 0-9a-zA-Z "${imgPath}"`)
            .toString()
            .trim()
  };

  return result;
});
