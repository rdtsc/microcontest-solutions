#!/usr/bin/env node

'use strict';

const math = require('mathjs');

const {solve} = require('~/lib/mc');

const unserialize = (matrix) =>
  math.matrix(JSON.parse(matrix.replace(/\]\[/g, '],[')));

const serialize = (matrix) => matrix.toString()
                                    .replace(/\s/g, '')
                                    .replace(/\],\[/g, '][');

solve(12, ({A: a, B: b}) =>
{
  a = unserialize(a);
  b = unserialize(b);

  const c = math.inv(math.multiply(a, math.transpose(b)));

  return {M: serialize(c)};
});
