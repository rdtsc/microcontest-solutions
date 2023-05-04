#!/usr/bin/env node

'use strict';

const {solve}     = require('~/lib/mc'),
      augment     = require('./augment'),
      triangulate = require('./triangulate'),
      unserialize = require('./unserialize');

solve(23, (args) =>
{
  args = augment(unserialize(args));

  return triangulate(args.satellites, args.metrics.earthRadius);
});
