#!/usr/bin/env node

'use strict';

const {solve}     = require('~/lib/mc'),
      unscramble  = require('./unscramble'),
      unserialize = require('./unserialize');

solve(9, 'raw', ({response}) =>
{
  const puzzle   = unserialize(response),
        solution = unscramble(puzzle);

  if(solution)
  {
    return {resultat: solution.join()};
  }
});
