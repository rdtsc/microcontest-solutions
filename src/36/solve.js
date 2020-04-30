#!/usr/bin/env node

'use strict';

const {solve}     = require('~/lib/mc'),
      identify    = require('./identify'),
      unserialize = require('./unserialize');

solve(36, (payload) =>
{
  payload = unserialize(payload);

  const result = {};

  for(let i = 1; i <= 3; ++i)
  {
    result[`id${i}`] = identify(payload[`img${i}`]);
  }

  return result;
});
