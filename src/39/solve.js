#!/usr/bin/env node

'use strict';

const {PNG}  = require('pngjs'),
      assert = require('assert');

const {solve} = require('~/lib/mc');

function getImage(response)
{
  const valueKey = 'Valeur=',
        valuePos = response.indexOf(valueKey) + valueKey.length;

  return PNG.sync.read(response.slice(valuePos, -5));
}

function getScanLine(img)
{
  const y = img.height >> 1;

  let row = [];

  for(let x = 0; x < img.width; ++x)
  {
    const isBlack = !img.data[(img.width * y + x) * 4];

    row.push(isBlack);
  }

  row = row.map(Number)
           .join('')
           .replace(/(.)\1/g, '$1')
           .replace(/^.0+|0+.$/g, '');

  return row;
}

function decode(img, encoding = require('./encoding'))
{
  const code = getScanLine(img);

  const result = [];

  for(let i = 0; i < code.length; i += 7)
  {
    if(code[i] === '0') ++i;

    const key = code.substr(i, 7);

    assert(key in encoding);

    result.push(encoding[key]);
  }

  assert(result.length >= 3);
  assert(result[0] === 'S');
  assert(result[result.length - 1] === 'S');

  return result.slice(1, -1).join('');
}

solve(39, 'raw', ({response}) =>
{
  const [number1, number2] =
    decode(getImage(response)).split('-');

  return {number1, number2};
});
