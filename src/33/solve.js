#!/usr/bin/env node

'use strict';

const {solve}     = require('~/lib/mc'),
      decode      = require('./decode'),
      demodulate  = require('./demodulate'),
      unserialize = require('./unserialize');

solve(33, 'raw', ({response}) =>
{
  const {signal: rawSignal, carrierFrequency} = unserialize(response);

  const signal   = demodulate(rawSignal, carrierFrequency),
        sequence = decode(signal);

  return {resultat: sequence};
});
