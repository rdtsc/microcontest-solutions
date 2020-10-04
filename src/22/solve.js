#!/usr/bin/env node

'use strict';

const {solve} = require('~/lib/mc');

solve(22, ({pieces}) =>
{
  const positions = [6, 20, 27, 34, 48];

  if(pieces.startsWith('d'.repeat(positions.length)))
  {
    const available =
      [...Array(64).keys()].filter(i => !positions.includes(i));

    for(let i = positions.length; i < pieces.length; ++i)
    {
      positions.push(available.shift());
    }

    const result = {};

    for(let i = 0; i < positions.length; ++i)
    {
      result[i + 1] = positions[i];
    }

    return result;
  }
});
