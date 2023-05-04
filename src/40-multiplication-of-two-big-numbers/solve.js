#!/usr/bin/env node

'use strict';

const {solve}     = require('~/lib/mc'),
      unserialize = require('./unserialize');

solve(40, ({rawChallengeResponse}) =>
{
  const {a, b} = unserialize(rawChallengeResponse);

  return {c: a.mul(b).toString()};
});
