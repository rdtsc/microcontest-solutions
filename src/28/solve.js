#!/usr/bin/env node

'use strict';

const {solve}     = require('~/lib/mc'),
      detect      = require('~/lib/yolo'),
      translate   = require('./translate'),
      unserialize = require('./unserialize');

solve(28, 'raw', async ({response}) =>
{
  const {img1, img2} = unserialize(response);

  const [one, two] = await detect('mc-yolo-detector:latest', img1, img2);

  return {...translate(one, 1), ...translate(two, 2)};
});
