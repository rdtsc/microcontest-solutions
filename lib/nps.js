'use strict';

const monkeyPatch = require('patch-module');

const patches =
[
  {
    find:    /function\s+NPuzzleSolver\s*\(/,
    replace: 'module.exports = NPuzzleSolver; function NPuzzleSolver(',
    expect:  1
  }
];

module.exports = monkeyPatch(require.resolve('./vendor/nps'), patches);
