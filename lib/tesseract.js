'use strict';

const path           = require('path'),
      {createWorker} = require('tesseract.js');

module.exports = async (whitelist) =>
{
  const cachePath =
    path.join(path.dirname(require.resolve('~/package')), '/models/tesseract');

  const tesseract = createWorker({cachePath});

  await tesseract.load();
  await tesseract.loadLanguage();
  await tesseract.initialize();

  if(typeof whitelist === 'string')
  {
    await tesseract.setParameters({tessedit_char_whitelist: whitelist});
  }

  return tesseract;
};
