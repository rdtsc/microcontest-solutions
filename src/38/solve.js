#!/usr/bin/env node

'use strict';

const sumBy = require('lodash.sumby');

const {solve}     = require('~/lib/mc'),
      segment     = require('./segment'),
      unserialize = require('./unserialize')

solve(38, 'raw', ({response}) =>
{
  try
  {
    response = unserialize(response);

    const segments = segment(response);

    const r = sumBy(segments, 'r'),
          w = sumBy(segments, 'w');

    return {nb_redbloodcells: r, nb_whitebloodcells: w};
  }

  catch(error)
  {
    console.error(error);
  }
});
