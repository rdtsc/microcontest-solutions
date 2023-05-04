#!/usr/bin/env node

'use strict';

const {solve}     = require('~/lib/mc'),
      unserialize = require('./unserialize');

solve(29, ({rawChallengeResponse}) =>
{
  const {signal, clear} = unserialize(rawChallengeResponse);

  const offsets =
  [
    signal[0] - clear[0],
    signal[1] - clear[1]
  ];

  const key = offsets[1] / (offsets[0] - offsets[0] ** 2);

  for(let i = offsets.length; i < signal.length; ++i)
  {
    const term = offsets[offsets.length - 1];

    offsets.push(key * term * (1 - term));
  }

  const decrypted = signal.map((v, i) => v - offsets[i])
                          .map(v => +(v > 0.5))
                          .join('');

  return {message_clair: decrypted};
});
