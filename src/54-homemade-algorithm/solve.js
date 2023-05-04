#!/usr/bin/env node

'use strict';

const decode      = require('./decode'),
      {solve}     = require('~/lib/mc'),
      tesseract   = require('~/lib/tesseract'),
      unserialize = require('./unserialize');

(async () =>
{
  const ocr = await tesseract('0123456789');

  await solve(54, async (payload) =>
  {
    payload = unserialize(payload);

    const img = await decode('mc-54-decoder:latest', payload);

    const {data: {text}} = await ocr.recognize(img);

    return {number: text};
  });

  await ocr.terminate();
})();
