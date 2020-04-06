#!/usr/bin/env node

'use strict';

const path      = require('path'),
      maxBy     = require('lodash.maxby'),
      Tesseract = require('tesseract.js');

const {solve} = require('~/lib/mc'),
      captcha = require('./captcha');

async function tesseract()
{
  const cachePath =
    path.join(path.dirname(require.resolve('~/package')), '/models/tesseract');

  const ocr = Tesseract.createWorker({cachePath});

  await ocr.load();
  await ocr.loadLanguage()
  await ocr.initialize();

  return ocr;
}

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
