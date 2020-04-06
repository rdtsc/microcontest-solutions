'use strict';

const monkeyPatch = require('patch-module');

const patches =
[
  {
    find:    /require\s*\(\s*['"]jimp['"]\s*\)/,
    replace: "require('../jimp')",
    expect:  1
  },

  {
    find:    /let\s+deskewedImage\s*=/,
    replace: 'return angle; let deskewedImage =',
    expect:  1
  }
];

module.exports = monkeyPatch(require.resolve('deskew'), patches);
