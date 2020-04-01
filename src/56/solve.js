#!/usr/bin/env node

'use strict';

const {PNG} = require('pngjs');

const {solve} = require('~/lib/mc');

solve(56, ({img_b64}) =>
{
  const [r, g, b] =
    PNG.sync.read(Buffer.from(img_b64, 'base64')).data;

  return {r, g, b};
});
