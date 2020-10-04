#!/usr/bin/env node

'use strict';

const maxBy = require('lodash.maxby');

const {solve}   = require('~/lib/mc'),
      captcha   = require('./captcha'),
      tesseract = require('~/lib/tesseract');

(async () =>
{
  const ocr = await tesseract();

  const recognize = async (img) =>
  {
    let {data: {text, confidence}} =
      await ocr.recognize(img);

    text = text.trim();

    return {text, confidence};
  };

  await solve(26, 'raw', async ({response}) =>
  {
    const {variant1, variant2} =
      await captcha.getNormalized(response);

    const solutions =
    [
      await recognize(variant1),
      await recognize(variant2)
    ];

    return {text: maxBy(solutions, result => result.confidence).text};
  });

  await ocr.terminate();
})();
