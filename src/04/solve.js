#!/usr/bin/env node

'use strict';

const {solve} = require('~/lib/mc');

function decrypt(text, key)
{
  const A = 'A'.charCodeAt(0);

  text = text.split('')
             .map(c => ((c.charCodeAt(0) - A - key + 26) % 26) + A);

  return String.fromCharCode(...text);
}

solve(4, ({txt_crypte: text, key}) => ({txt_clair: decrypt(text, key)}));
