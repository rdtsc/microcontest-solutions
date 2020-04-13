#!/usr/bin/env node

'use strict';

const {solve}     = require('~/lib/mc'),
      unserialize = require('./unserialize');

solve(46, ({rawChallengeResponse}) =>
{
  const {sequence, numbers} = unserialize(rawChallengeResponse);

  const firstCard = sequence[0],
        lastCard  = sequence[sequence.length - 1];

  let i      = 0,
      j      = 0,
      result = [firstCard, ...Array(sequence.length - 1)];

  for(let n of numbers)
  {
    while(n-- >= 0)
    {
      while(result[i = ++i % sequence.length]);
    }

    result[i] = sequence[++j];
  }

  return {initial_sequence: result.map(c => c ? c : lastCard).join(';')};
});
