#!/usr/bin/env node

'use strict';

const rle = require('rle-data');

const {solve} = require('~/lib/mc');

const encode = (str) =>
  rle.encode(str.split('')).join('');

function decode(str)
{
  str = str.split(/(\d+)/)
           .filter(v => v.length)
           .map(v => /\d/.test(v) ? +v : v);

  return rle.decode(str).join('');
}

solve(31, ({donnees_a_compresser: enc, donnees_a_decompresser: dec}) =>
{
  const result =
  {
    resultat_compression:   encode(enc),
    resultat_decompression: decode(dec)
  };

  return result;
});
