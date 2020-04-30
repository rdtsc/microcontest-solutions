'use strict';

const assert = require('assert');

const irisRegistry = require('./registry');

module.exports = (img) =>
{
  assert(img.id in irisRegistry);

  return irisRegistry[img.id];
};
