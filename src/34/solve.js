#!/usr/bin/env node

'use strict';

const io      = require('./io'),
      engine  = require('./engine'),
      {solve} = require('~/lib/mc');

solve(34, 'raw', ({response}) =>
{
  const {compress, decompress, padding} =
    io.unserialize(response);

  const deflated = engine.deflate(compress),
        inflated = engine.inflate(decompress, padding);

  return io.serialize(deflated, inflated);
});
